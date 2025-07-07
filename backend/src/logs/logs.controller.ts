import { Controller, Get, Post, Param, Body, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { LogsService } from './logs.service';
import { AuthGuard } from '@nestjs/passport';
import { RollbackDto } from '../common/dto/rollback.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('deploys/:repo')
  @UseGuards(AuthGuard('github'))
  async getDeploys(@Param('repo') repo: string, @Req() req: any) {
    // Pass accessToken to fetch real deploys from GitHub
    return this.logsService.getDeploys(repo, req.user?.githubId, req.user?.accessToken);
  }

  @Get('deploy/:id/:repo')
  @UseGuards(AuthGuard('github'))
  async getLogs(@Param('id') id: string, @Param('repo') repo: string, @Req() req: any) {
    // Pass accessToken and repo to fetch real logs from GitHub
    return this.logsService.getLogs(id, repo, req.user?.accessToken);
  }

  @Post('rollback/:id/:repo')
  @UseGuards(AuthGuard('github'))
  async rollback(
    @Param('id') id: string,
    @Param('repo') repo: string,
    @Body(new ValidationPipe({ transform: true })) rollbackDto: RollbackDto,
    @Req() req: any
  ) {
    // Pass accessToken and repo for rollback
    return this.logsService.rollback(id, rollbackDto.sha, repo, req.user?.accessToken);
  }
}
