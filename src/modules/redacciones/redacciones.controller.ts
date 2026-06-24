import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedaccionesService } from './redacciones.service';
import { CreateRedaccionDto } from './dto/create-redaccion.dto';
import { SearchRedaccionDto } from './dto/search-redaccion.dto';
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
  findAll(@Query() search: SearchRedaccionDto) {
    return this.redaccionesService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redaccionesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRedaccionDto) {
    return this.redaccionesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redaccionesService.remove(id);
  }
}
