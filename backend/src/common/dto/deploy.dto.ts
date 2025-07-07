import { IsString, IsOptional, IsObject } from 'class-validator';

export class DeployDto {
  @IsString()
  owner: string;

  @IsString()
  repo: string;

  @IsString()
  workflow_id: string;

  @IsString()
  ref: string;

  @IsOptional()
  @IsObject()
  inputs?: Record<string, any>;
}
