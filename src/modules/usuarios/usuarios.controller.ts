import { ApiTags } from "@nestjs/swagger";
import { Controller,  Body, Post, Get, Param, Put, Delete, Patch  } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { CreateUserDto } from "./dto/create-user.dto";
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
    findAll(){
        return this.usuariosService.findAll();
    }


    @Get('inactivos')
    findInactive(){
        return this.usuariosService.findInactive();
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

    @Patch(':id')
    partialUpdate(
        @Param('id')
        id:string,
        @Body()
        dto:UpdateUserDto
    ){
        return this.usuariosService.partialUpdate(id,dto);
    }

    @Delete(':id')
    remove(
        @Param('id')
        id:string,
    ){
        return this.usuariosService.remove(id);
    }
}
