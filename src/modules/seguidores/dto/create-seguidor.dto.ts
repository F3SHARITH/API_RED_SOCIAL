
import { IsOptional } from 'class-validator';

export class CreateSeguidorDto {
  @IsOptional()
  seguidor_id!: string;

  @IsOptional()
  seguido_id!: string;
}
