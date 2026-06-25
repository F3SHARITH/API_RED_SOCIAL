import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateComentarioDto } from 'src/modules/comentarios/dto/create-comentario.dto';
import { SearchComentarioDto } from 'src/modules/comentarios/dto/search-comentario.dto';
import { UpdateComentarioDto } from 'src/modules/comentarios/dto/update-comentario.dto';
import { Comentario, ComentarioDocument } from './schemas/comentario.schema';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario.name)
    private readonly comentarioModel: Model<ComentarioDocument>,
  ) {}

  async create(dto: CreateComentarioDto) {
    const created = await this.comentarioModel.create(dto);
    return ResponseHelper.success(created, 201);
  }

  async findAll(search: SearchComentarioDto = {}) {
    const filter: any = { activo: true };

    if (search.texto) {
      filter.texto = {
        $regex: search.texto,
        $options: 'i',
      };
    }

    if (search.publicacion_id) {
      filter.publicacion_id = search.publicacion_id;
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    const data = await this.comentarioModel
      .find(filter)
      .populate('usuario_id')
      .populate('publicacion_id')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.comentarioModel.countDocuments(filter);

    return ResponseHelper.success({ total, page, limit, data });
  }

  async findOne(id: string) {
    const comentario = await this.comentarioModel.findById(id).populate('usuario_id').populate('publicacion_id');

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    return ResponseHelper.success(comentario);
  }

  async update(id: string, dto: UpdateComentarioDto) {
    const comentario = await this.comentarioModel.findById(id);

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const updated = await this.comentarioModel.findByIdAndUpdate(id, dto, { new: true });

    return ResponseHelper.success(updated, 200);
  }

  async findInactive() {
    const comentarios = await this.comentarioModel.find({ activo: false });
    return ResponseHelper.success(comentarios);
  }

  async partialUpdate(id: string, dto: UpdateComentarioDto) {
    const comentario = await this.comentarioModel.findById(id);

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const updated = await this.comentarioModel.findByIdAndUpdate(id, { $set: dto }, { new: true });

    return ResponseHelper.success(updated, 200);
  }

  async restore(id: string) {
    const comentario = await this.comentarioModel.findById(id);

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const restored = await this.comentarioModel.findByIdAndUpdate(id, { activo: true }, { new: true });

    return ResponseHelper.success(restored, 200);
  }

  async remove(id: string) {
    const comentario = await this.comentarioModel.findById(id);

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const deleted = await this.comentarioModel.findByIdAndUpdate(id, { activo: false }, { new: true });

    return ResponseHelper.success(deleted, 200);
  }
}
