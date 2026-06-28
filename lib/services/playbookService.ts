import { apiClient } from './apiClient';
import { HiringPlaybookInput, HiringPlaybookGenerateResponse } from '@/types/hiring-playbook';

class PlaybookService {
  async generatePlaybook(payload: HiringPlaybookInput) {
    return apiClient.post<HiringPlaybookGenerateResponse>('/api/playbook/generate', payload);
  }
}

export const playbookService = new PlaybookService();
