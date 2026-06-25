import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeguidoresService } from './seguidores.service';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';

@ApiTags('Seguidores')
@Controller('seguidores')
export class SeguidoresController {
  constructor(private readonly seguidoresService: SeguidoresService) {}

  @Post()
  create(@Body() dto: CreateSeguidorDto) {
    return this.seguidoresService.create(dto);
  }

  @Get()
  findAll() {
    return this.seguidoresService.findAll();
  }

  @Get('inactivos')
  findInactive() {
    return this.seguidoresService.findInactive();
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: CreateSeguidorDto) {
    return this.seguidoresService.partialUpdate(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguidoresService.remove(id);
  }
}
