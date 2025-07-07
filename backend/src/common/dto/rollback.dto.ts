import { IsString } from 'class-validator';

export class RollbackDto {
  @IsString()
  sha: string;
}
