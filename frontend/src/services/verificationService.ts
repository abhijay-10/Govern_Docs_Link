import { VerificationPair } from '../types';
import { initialVerificationPairs } from '../data/mockData';

// Simulates future FastAPI GET /verification, POST /verification/run
export const verificationService = {
  async getVerificationPairs(): Promise<VerificationPair[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...initialVerificationPairs];
  },

  async runConsistencyCheck(): Promise<{
    pairs: VerificationPair[];
    aggregateConfidence: number;
  }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      pairs: initialVerificationPairs,
      aggregateConfidence: 97.8,
    };
  },
};
