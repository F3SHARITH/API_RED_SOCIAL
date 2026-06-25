import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@ApiTags('Comentarios')
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() dto: CreateComentarioDto) {
    return this.comentariosService.create(dto);
  }

  @Get()
  findAll() {
    return this.comentariosService.findAll();
  }

  @Get('inactivos')
  findInactive() {
    return this.comentariosService.findInactive();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateComentarioDto) {
    return this.comentariosService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateComentarioDto) {
    return this.comentariosService.partialUpdate(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosService.remove(id);
  }
}
