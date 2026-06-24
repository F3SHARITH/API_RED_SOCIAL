import { PartialType } from '@nestjs/swagger';
import { CreateRedaccionDto } from './create-redaccion.dto';

export class UpdateRedaccionDto extends PartialType(CreateRedaccionDto) {}
