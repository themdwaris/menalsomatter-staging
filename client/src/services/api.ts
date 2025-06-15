// ✅ Updated api.ts
import { RaffleEntry, RaffleStatus } from "../types";

const MOCK_USER_ID = "123";
const BASE_URL =
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";

export const fetchRaffleStatus = async (): Promise<RaffleStatus> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/raffle-status?userId=${MOCK_USER_ID}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format - expected JSON");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching raffle status:", error);
    return { tickets: 0 };
  }
};

export const submitRaffleEntry = async (): Promise<RaffleEntry> => {
  try {
    const response = await fetch(`${BASE_URL}/api/raffle-entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: MOCK_USER_ID }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format - expected JSON");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting raffle entry:", error);
    return {
      success: false,
      error: "Unable to submit your entry. Please try again later.",
    };
  }
};
