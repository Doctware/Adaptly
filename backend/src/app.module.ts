// App module for NestJS
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DeployModule } from './deploy/deploy.module';
import { FeatureFlagsModule } from './feature-flags/feature-flags.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [AuthModule, DeployModule, FeatureFlagsModule, LogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
