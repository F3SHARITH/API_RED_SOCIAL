import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePublicacionDto {
  @ApiProperty({ description: 'Título de la publicación' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  titulo!: string;

  @ApiProperty({ description: 'Contenido de la publicación' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  contenido!: string;

  @ApiProperty({ description: 'Identificador del usuario que publica' })
  @IsString()
  @IsNotEmpty()
  usuario_id!: string;
}
