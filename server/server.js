const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(cors());

// app.use(bodyParser.raw({ type: "application/json" }));

const CONNECTED_ACCOUNT_ID = "acct_1RSCgTRhwk3BcY4W";

app.get("/", async (req, res) => {
  return res.json({ message: "Hello from backend" });
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Support Men's Wellness",
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      // payment_intent_data: {
      //   application_fee_amount: 20,
      //   transfer_data: {
      //     destination: CONNECTED_ACCOUNT_ID,
      //   },
      // },
      success_url: "http://localhost:3000/success.html",
      cancel_url: "http://localhost:3000/cancel.html",
    });
    console.log(res);

    res.json({ url: session.url });
  } catch (e) {
    console.error("❌ Error in /create-checkout-session:", e);
    res.status(500).json({ error: e.message });
  }
});

// Use raw body only for webhook route
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    let userTickets = {};

    app.get("/api/raffle-status", (req, res) => {
      const userId = req.query.userId;
      if (!userId)
        return res.status(400).json({ error: "User ID is required" });

      const tickets = userTickets[userId] || 0;
      res.json({ tickets });
    });

    app.post("/api/raffle-entry", (req, res) => {
      const { userId } = req.body;
      if (!userId)
        return res
          .status(400)
          .json({ success: false, error: "User ID missing" });

      userTickets[userId] = (userTickets[userId] || 0) + 1;
      res.json({ success: true, tickets: userTickets[userId] });
    });

    switch (event.type) {
      case "checkout.session.completed":
        console.log(
          "✅ Donation successful! Session ID:",
          event.data.object.id
        );
        break;
      case "payment_intent.payment_failed":
        console.log("❌ Payment failed.");
        break;
      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
    res.send();
  }
);

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
