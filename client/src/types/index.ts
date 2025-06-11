export interface RaffleStatus {
  tickets: number;
}

export interface RaffleEntry {
  success: boolean;
  tickets?: number;
  error?: string;
}