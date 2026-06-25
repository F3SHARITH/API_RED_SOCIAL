import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedaccionesService } from './redacciones.service';
import { CreateRedaccionDto } from './dto/create-redaccion.dto';
import { UpdateRedaccionDto } from './dto/update-redaccion.dto';

@ApiTags('Redacciones')
@Controller('redacciones')
export class RedaccionesController {
  constructor(private readonly redaccionesService: RedaccionesService) {}

  @Post()
  create(@Body() dto: CreateRedaccionDto) {
    return this.redaccionesService.create(dto);
  }

  @Get()
  findAll() {
    return this.redaccionesService.findAll();
  }

  @Get('inactivos')
  findInactive() {
    return this.redaccionesService.findInactive();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRedaccionDto) {
    return this.redaccionesService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateRedaccionDto) {
    return this.redaccionesService.partialUpdate(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redaccionesService.remove(id);
  }
}
