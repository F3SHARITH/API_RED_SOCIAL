import { ApiTags } from "@nestjs/swagger";
import { Controller,  Body, Post, Get, Param, Put, Delete, Query, Search  } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('Usuarios')
@Controller('usuarios') 

export class UsuariosController {
    constructor(
        private readonly usuariosService:
         UsuariosService,
    ) {}

    @Post()
    create(
        @Body()
        dto:CreateUserDto
    ){
        return this.usuariosService.create(dto);
    }

    @Get()
    findAll(
        @Query()
        Search:SearchUserDto
    ){
        return this.usuariosService.findAll(Search);
    }


    @Get(':id')
    findOne(
        @Param('id')
        id:string
    ){
        return this.usuariosService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id')
        id:string,
        @Body()
        dto:UpdateUserDto
    ){
        return this.usuariosService.update(id,dto);
    }


    @Delete(':id')
    remove(
        @Param('id')
        id:string,
    ){
        return this.usuariosService.remove(id);
    }
}