import { IsBoolean } from 'class-validator';

export class SetFeatureFlagDto {
  @IsBoolean()
  value: boolean;
}
