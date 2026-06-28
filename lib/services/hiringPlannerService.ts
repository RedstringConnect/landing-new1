import { apiClient } from './apiClient';

import {
  HiringPlannerGenerateResponse,
  HiringPlannerInput,
  HiringPlannerUnlockRequest,
  HiringPlannerUnlockResponse,
} from '@/types/hiring-planner';

class HiringPlannerService {
  async generatePlaybook(payload: HiringPlannerInput) {
    return apiClient.post<HiringPlannerGenerateResponse>('/api/hiring-planner/generate', payload);
  }

  async unlockPlaybook(payload: HiringPlannerUnlockRequest) {
    return apiClient.post<HiringPlannerUnlockResponse>('/api/hiring-planner/unlock', payload);
  }
}

export const hiringPlannerService = new HiringPlannerService();
