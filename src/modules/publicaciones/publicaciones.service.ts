import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreatePublicacionDto } from 'src/modules/publicaciones/dto/create-publicacion.dto';
import { SearchPublicacionDto } from 'src/modules/publicaciones/dto/search-publicacion.dto';
import { UpdatePublicacionDto } from 'src/modules/publicaciones/dto/update-publicacion.dto';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name)
    private readonly publicacionModel: Model<PublicacionDocument>,
  ) {}

  async create(dto: CreatePublicacionDto) {
    const created = await this.publicacionModel.create(dto);
    return ResponseHelper.success(created, 201);
  }

  async findAll(search: SearchPublicacionDto) {
    const filter: any = { activo: true };

    if (search.titulo) {
      filter.titulo = {
        $regex: search.titulo,
        $options: 'i',
      };
    }

    if (search.usuario_id) {
      filter.usuario_id = search.usuario_id;
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    const data = await this.publicacionModel
      .find(filter)
      .populate('usuario_id')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.publicacionModel.countDocuments(filter);

    return ResponseHelper.success({ total, page, limit, data });
  }

  async findOne(id: string) {
    const publicacion = await this.publicacionModel.findById(id).populate('usuario_id');

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    return ResponseHelper.success(publicacion);
  }

  async update(id: string, dto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionModel.findById(id);

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    const updated = await this.publicacionModel.findByIdAndUpdate(id, dto, { new: true });

    return ResponseHelper.success(updated, 200);
  }

  async remove(id: string) {
    const publicacion = await this.publicacionModel.findById(id);

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    const deleted = await this.publicacionModel.findByIdAndUpdate(id, { activo: false }, { new: true });

    return ResponseHelper.success(deleted, 200);
  }
}
