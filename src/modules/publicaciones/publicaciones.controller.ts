import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@ApiTags('Publicaciones')
@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  @Post()
  create(@Body() dto: CreatePublicacionDto) {
    return this.publicacionesService.create(dto);
  }

  @Get()
  findAll() {
    return this.publicacionesService.findAll();
  }

  @Get('inactivos')
  findInactive() {
    return this.publicacionesService.findInactive();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePublicacionDto) {
    return this.publicacionesService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdatePublicacionDto) {
    return this.publicacionesService.partialUpdate(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(id);
  }
}
