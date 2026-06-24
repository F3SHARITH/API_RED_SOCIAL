import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateComentarioDto {
  @ApiProperty({ description: 'Texto del comentario' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  texto!: string;

  @ApiProperty({ description: 'Identificador del usuario que comenta' })
  @IsString()
  @IsNotEmpty()
  usuario_id!: string;

  @ApiProperty({ description: 'Identificador de la publicación' })
  @IsString()
  @IsNotEmpty()
  publicacion_id!: string;
}
