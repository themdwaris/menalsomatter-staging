import { rest } from 'msw';

// Mock data store
let userTickets = {
  '123': 0
};

export const handlers = [
  // GET /api/raffle-status
  rest.get('/api/raffle-status', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');
    
    if (!userId) {
      return res(
        ctx.set('Content-Type', 'application/json'),
        ctx.status(400),
        ctx.json({ error: 'Missing userId parameter' })
      );
    }
    
    // Return tickets for user, defaulting to 0 if not found
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json({ tickets: userTickets[userId] || 0 })
    );
  }),
  
  // POST /api/raffle-entry
  rest.post('/api/raffle-entry', async (req, res, ctx) => {
    const { userId } = await req.json();
    
    if (!userId) {
      return res(
        ctx.set('Content-Type', 'application/json'),
        ctx.status(400),
        ctx.json({ 
          success: false,
          error: 'Missing userId parameter' 
        })
      );
    }
    
    // Initialize if user doesn't exist
    if (!userTickets[userId]) {
      userTickets[userId] = 0;
    }
    
    // Increment tickets
    userTickets[userId] += 1;
    
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json({ 
        success: true,
        tickets: userTickets[userId]
      })
    );
  }),
];