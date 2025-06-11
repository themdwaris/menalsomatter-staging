import { RaffleEntry, RaffleStatus } from '../types';

// Mock user ID - in a real app, this would come from authentication
const MOCK_USER_ID = '123';

export const fetchRaffleStatus = async (): Promise<RaffleStatus> => {
  try {
    const response = await fetch(`/api/raffle-status?userId=${MOCK_USER_ID}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format - expected JSON');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching raffle status:', error);
    return { tickets: 0 };
  }
};

export const submitRaffleEntry = async (): Promise<RaffleEntry> => {
  try {
    const response = await fetch('/api/raffle-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: MOCK_USER_ID }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format - expected JSON');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting raffle entry:', error);
    return { 
      success: false, 
      error: 'Unable to submit your entry. Please try again later.' 
    };
  }
};