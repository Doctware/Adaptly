import { Controller, Post, Body, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { DeployService } from './deploy.service';
import { AuthGuard } from '@nestjs/passport';
import { DeployDto } from '../common/dto/deploy.dto';

@Controller('deploy')
export class DeployController {
  constructor(private readonly deployService: DeployService) {}

  @Post()
  @UseGuards(AuthGuard('github'))
  async triggerDeploy(
    @Body(new ValidationPipe({ transform: true })) deployDto: DeployDto,
    @Req() req: any
  ) {
    // deployDto: { owner, repo, workflow_id, ref, inputs }
    return this.deployService.triggerGithubAction(deployDto, req.user?.accessToken);
  }
}
