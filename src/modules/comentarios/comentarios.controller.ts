import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { SearchComentarioDto } from './dto/search-comentario.dto';
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
  findAll(@Query() search: SearchComentarioDto) {
    return this.comentariosService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateComentarioDto) {
    return this.comentariosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosService.remove(id);
  }
}
