import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRedaccionDto {
  @ApiProperty({ description: 'Título de la redacción' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  titulo!: string;

  @ApiProperty({ description: 'Contenido de la redacción' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  contenido!: string;

  @ApiProperty({ description: 'Identificador del usuario que redacta' })
  @IsString()
  @IsNotEmpty()
  usuario_id!: string;
}
