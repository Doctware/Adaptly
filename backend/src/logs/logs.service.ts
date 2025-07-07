import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LogsService {
  async getDeploys(repo: string, userId?: string, accessToken?: string) {
    // repo format: owner/repo
    if (!accessToken) throw new HttpException('No access token', HttpStatus.UNAUTHORIZED);
    const [owner, repoName] = repo.split('/');
    try {
      const url = `https://api.github.com/repos/${owner}/${repoName}/actions/runs`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'Adaptly-Deploy-App',
        },
      });
      return response.data.workflow_runs.map(run => ({
        id: run.id,
        sha: run.head_sha,
        status: run.status,
        conclusion: run.conclusion,
        created_at: run.created_at,
        updated_at: run.updated_at,
      }));
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch deploys',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLogs(runId: string, repo: string, accessToken?: string) {
    // repo format: owner/repo
    if (!accessToken) throw new HttpException('No access token', HttpStatus.UNAUTHORIZED);
    const [owner, repoName] = repo.split('/');
    try {
      const url = `https://api.github.com/repos/${owner}/${repoName}/actions/runs/${runId}/logs`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'Adaptly-Deploy-App',
        },
        responseType: 'arraybuffer',
      });
      // GitHub returns a zip file; for MVP, return as base64 string
      return Buffer.from(response.data).toString('base64');
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch logs',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async rollback(runId: string, sha: string, repo: string, accessToken?: string) {
    // For rollback, trigger a new deploy with the given SHA
    // You may want to call the deploy service here
    return { status: 'rollback triggered', runId, sha };
  }
}
