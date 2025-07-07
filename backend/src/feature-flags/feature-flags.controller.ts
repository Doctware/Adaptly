import { Controller, Get, Post, Body, Param, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';
import { AuthGuard } from '@nestjs/passport';
import { SetFeatureFlagDto } from '../common/dto/set-feature-flag.dto';

@Controller('feature-flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Get(':key')
  @UseGuards(AuthGuard('github'))
  async getFlag(@Param('key') key: string, @Req() req: any) {
    // Optionally use req.user for per-user flags
    return this.featureFlagsService.getFlag(key, req.user?.githubId);
  }

  @Post(':key')
  @UseGuards(AuthGuard('github'))
  async setFlag(
    @Param('key') key: string,
    @Body(new ValidationPipe({ transform: true })) setFlagDto: SetFeatureFlagDto,
    @Req() req: any
  ) {
    return this.featureFlagsService.setFlag(key, setFlagDto.value, req.user?.githubId);
  }
}
