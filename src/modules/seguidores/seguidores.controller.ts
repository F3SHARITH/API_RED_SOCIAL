import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeguidoresService } from './seguidores.service';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { SearchSeguidorDto } from './dto/search-seguidor.dto';

@ApiTags('Seguidores')
@Controller('seguidores')
export class SeguidoresController {
  constructor(private readonly seguidoresService: SeguidoresService) {}

  @Post()
  create(@Body() dto: CreateSeguidorDto) {
    return this.seguidoresService.create(dto);
  }

  @Get()
  findAll(@Query() search: SearchSeguidorDto) {
    return this.seguidoresService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguidoresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguidoresService.remove(id);
  }
}
