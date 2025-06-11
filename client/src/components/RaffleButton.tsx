import React, { useState, useEffect } from 'react';
import { Ticket, CheckCircle, AlertCircle } from 'lucide-react';
import { fetchRaffleStatus, submitRaffleEntry } from '../services/api';
import { RaffleStatus } from '../types';

const RaffleButton: React.FC = () => {
  const [status, setStatus] = useState<RaffleStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({
    text: '',
    type: null,
  });

  useEffect(() => {
    const getInitialStatus = async () => {
      try {
        const data = await fetchRaffleStatus();
        setStatus(data);
      } catch (error) {
        console.error('Failed to fetch initial raffle status:', error);
      }
    };

    getInitialStatus();
  }, []);

  const handleRaffleEntry = async () => {
    setIsLoading(true);
    setMessage({ text: '', type: null });

    try {
      const result = await submitRaffleEntry();
      
      if (result.success && result.tickets !== undefined) {
        setStatus({ tickets: result.tickets });
        setMessage({
          text: `You have ${result.tickets} ticket${result.tickets !== 1 ? 's' : ''}`,
          type: 'success',
        });
      } else {
        setMessage({
          text: result.error || 'Failed to enter raffle',
          type: 'error',
        });
      }
    } catch (error) {
      setMessage({
        text: 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="font-bold text-lg mb-3 text-navy-900">Monthly Support Raffle</h3>
      
      <p className="text-gray-600 mb-4 text-sm">
        Join our monthly raffle for a chance to win a free counseling session or wellness package.
      </p>
      
      {status && (
        <div className="flex items-center mb-3 text-sm">
          <Ticket className="mr-2 text-teal-500" size={16} />
          <span>
            You currently have {status.tickets} ticket{status.tickets !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      
      <button
        onClick={handleRaffleEntry}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center
          ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-navy-700 hover:bg-navy-800 active:bg-navy-900 text-white'}`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>Join the Raffle</>
        )}
      </button>
      
      {message.text && (
        <div 
          className={`mt-3 p-2 rounded-md text-sm flex items-start
            ${message.type === 'success' ? 'bg-green-50 text-green-800' : ''}
            ${message.type === 'error' ? 'bg-red-50 text-red-800' : ''}`}
        >
          {message.type === 'success' && (
            <CheckCircle className="mr-2 flex-shrink-0" size={16} />
          )}
          {message.type === 'error' && (
            <AlertCircle className="mr-2 flex-shrink-0" size={16} />
          )}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
};

export default RaffleButton;