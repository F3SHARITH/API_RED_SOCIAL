
import { IsOptional } from 'class-validator';

export class SearchRedaccionDto {
 
  @IsOptional()
  publicacion_id?: string;


  @IsOptional()
  tipo_reaccion?: string;

 
  @IsOptional()
  usuario_id?: string;


  @IsOptional()
  page?: string;


  @IsOptional()
  limit?: string;
}
