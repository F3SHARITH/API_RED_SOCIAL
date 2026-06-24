import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSeguidorDto {
  @ApiProperty({ description: 'Identificador del usuario que sigue' })
  @IsString()
  @IsNotEmpty()
  seguidor_id!: string;

  @ApiProperty({ description: 'Identificador del usuario seguido' })
  @IsString()
  @IsNotEmpty()
  seguido_id!: string;
}
