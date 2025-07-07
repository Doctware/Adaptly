import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DeployService {
  async triggerGithubAction(body: any, accessToken: string) {
    const { owner, repo, workflow_id, ref = 'main', inputs = {} } = body;
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;
      const response = await axios.post(
        url,
        { ref, inputs },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'Adaptly-Deploy-App',
          },
        },
      );
      return { status: 'success', data: response.data };
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to trigger deploy',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
