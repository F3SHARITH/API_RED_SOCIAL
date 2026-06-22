import {Controller,  Body, Post, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly Service: 
        RolesService,
    ){}

    /**
     * crear rol
     */

    @Post()
    create(
        @Body() 
        dto: CreateRoleDto
    ){
        return this.Service.create(
            dto
        );
    }

    /**
     * 
     *  CONSULTAR ROLES
     */

    @Get()
    findAll(){
        return this.Service.findAll();
    }

    /**
     * consultar roles inactivos
     */
    @Get('inactivos')
    findInactive(){
        return this.Service.findInactive();
    }

    /**

     * buscar rol por id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id: string,

    ){
        return this.Service.findOne(
            id,
        );
    }


    /**
     * actualizar rol por id
     * 
     */
    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateRoleDto
    ){
        return this.Service.update(
            id,
            dto
        );
    }

    /** 
     * ACTUALIZACION PARCIAL DE UN ROL POR ID
     */
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateRoleDto
    ){
        return this.Service.partialUpdate(
            id,
            dto
        );
    }

    /**
     * RESTAURAR ROL ELIMINADO LOGICAMENTE POR ID
     */
    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id: string,
    ){
        return this.Service.restore(
            id
        );
    }





    /**
     * ELIMINACION LOGICA DE UN ROL POR ID
     */

    @Delete(':id')
    remove(
        @Param('id')
        id: string
    ){
        return this.Service.remove(
            id
        );
    }

}