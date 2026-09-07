import { ActivityEvent } from '../types';
import { initialActivityEvents } from '../data/mockData';

// Simulates future FastAPI GET /activity
export const activityService = {
  async getActivities(): Promise<ActivityEvent[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...initialActivityEvents];
  },

  async logActivity(
    category: 'security' | 'documents' | 'sharing' | 'verification',
    title: string,
    description: string
  ): Promise<ActivityEvent> {
    return {
      id: `act_${Date.now()}`,
      category,
      title,
      description,
      timestamp: 'Just now',
      timeAgo: 'Just now',
      device: 'Chrome 124 (macOS Sonoma)',
      location: 'Mumbai, MH, India',
      ipMasked: '103.21.•••.84',
    };
  },
};
