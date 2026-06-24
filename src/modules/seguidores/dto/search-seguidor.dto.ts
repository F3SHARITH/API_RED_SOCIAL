import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchSeguidorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seguidor_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  seguido_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  limit?: string;
}
