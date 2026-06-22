import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectModel(User.name) 
        private readonly userModel: 
        Model<UserDocument>,
    ) {}

    /**
     * metodo para crear un nuevo usuario
     */
    async create(dto: CreateUserDto) {
        // verificacion de correo
        const exists = await this.userModel.findOne({ correo: dto.correo });
        if (exists) {
            throw new BadRequestException('El correo ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(dto.password,10);
        // creacion del nuevo usuario
        const User = await this.userModel.create({
            ...dto,
            password: hashedPassword
        });
        return ResponseHelper.success(User,201);
    }
     

    /**
     * CONSULTA DE USUARIOS
     */
    async findAll(search:SearchUserDto) {
        // crear filtro
        const filter: any = {activo:true};

        // filtro por nombre 

        if(search.nombre){
            filter.nombre={
                $regex:search.nombre,
                $options: 'i'
            };
        }
        
        const page= Number(search.page) || 1;
        const limit= Number(search.limit) || 10;
        // consulta 

        const data = await this.userModel.find(
            filter).populate(
                'rol_id').skip((
                    page-1)*limit).limit(limit);

        // contador de documentos = contador de usuarios
        const total = await this.userModel.countDocuments(filter);   
        
        return ResponseHelper.success({ total, page, limit, data});
    }
    

    /**
     * consulta por id de usuario
     */

    async findOne(id:string){
        const user = await this.userModel.findById(id).populate('rol_id');


        if(!user){
        throw new NotFoundException('Usuario no encontrado')

        return ResponseHelper.success(User,201);
        }
    }



    /**
     * ACTUALIZACION DE HORARIO
     */
    async update(id:string, dto:UpdateUserDto){
        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException('Usuario no encontrado');
        }

        if(dto.password){
            dto.password = await bcrypt.hash(dto.password,10);
        }

        const updateUser = await this.userModel.findByIdAndUpdate(
            id, 
            dto, 
            { new: true });

        return ResponseHelper.success(updateUser, 200);
    }

    /**
     * soft delete
     */

    async remove(id:string){
        const user = await this.userModel.findById(id)

        if(!user){
            throw new NotFoundException('usuario no encontrado')
        }
        const deleteUser = await this.userModel.findByIdAndUpdate(
            id,
            {activo: false},
            {new: true}
        );

        return ResponseHelper.success(deleteUser);

    }

}