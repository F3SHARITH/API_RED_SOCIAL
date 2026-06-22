import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument, Role } from './schemas/roles.schemas';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateRoleDto } from './dto/update-role.dto';


@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel:
        Model<RoleDocument>,
    ) {}

    /**
     * metodo para crear un nuevo rol
     */
    async create(
        dto: CreateRoleDto,
    ){
        const role=
        await this.roleModel.create(dto);
        
        return ResponseHelper.success(
            role,
            201,
        );
    }

    /** 
     * metodo para consultar roles
     */

    async findAll(){
        const roles=
        await this.roleModel.find({activo: true});

        return ResponseHelper.success(roles);
    }

    /**
     * consulta de roles eliminados logicamente
     */
    async findInactive(){
        const roles = 
        await this.roleModel.find({activo:false});

        return ResponseHelper.success(roles);
    }



    /**
     * buscar un rol por id
     */
    async findOne(id:string){
        const role=
        await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException(
                `No se encontró el rol con id ${id}`,
            );
        }
        return ResponseHelper.success(role);
    }

    /**
     * actualizar un rol por id
     */
    async update(id:string, dto: UpdateRoleDto){
        const role=
        await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException(
                `No se encontró el rol con id ${id}`,
            );
        }
        const updatedRole=
        await this.roleModel.findByIdAndUpdate(
            id,
            dto,
            { new: true }
        );
        return ResponseHelper.success(updatedRole);
    }

    /**
     * actualizacion parcial de un rol por id
     */

    async partialUpdate(id:string, dto: UpdateRoleDto){
        const role=
        await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException(
                `No se encontró el rol con id ${id}`,
            );
        }
        const updatedRole=
        await this.roleModel.findByIdAndUpdate(
            id,
            { $set: dto },
            { new: true }
        );
        return ResponseHelper.success(updatedRole, 200);
    }

    /**
     * eliminacion logica de un rol por id 
     */

    async remove(id:string){
        const role=
        await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException(
                `No se encontró el rol con id ${id}`,
            );
        }
        const deletedRole=
         await this.roleModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
         );
            return ResponseHelper.success(deletedRole);
    }


    /**
     * RESTAURAR ROL ELIIMINADO LOGICAMENTE POR ID
     */

    async restore(id:string){
        const role=
        await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException(
                `No se encontró el rol con id ${id}`,
            );
        }
        const restoredRole=
         await this.roleModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true }
         );
            return ResponseHelper.success(restoredRole);
    }


}