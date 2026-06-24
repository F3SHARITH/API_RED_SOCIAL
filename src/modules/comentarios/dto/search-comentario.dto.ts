import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchComentarioDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  texto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  publicacion_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  limit?: string;
}
