import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateRedaccionDto } from 'src/modules/redacciones/dto/create-redaccion.dto';
import { SearchRedaccionDto } from 'src/modules/redacciones/dto/search-redaccion.dto';
import { UpdateRedaccionDto } from 'src/modules/redacciones/dto/update-redaccion.dto';
import { Redaccion, RedaccionDocument } from './schemas/redaccion.schema';

@Injectable()
export class RedaccionesService {
  constructor(
    @InjectModel(Redaccion.name)
    private readonly redaccionModel: Model<RedaccionDocument>,
  ) {}

  async create(dto: CreateRedaccionDto) {
    const created = await this.redaccionModel.create(dto);
    return ResponseHelper.success(created, 201);
  }

  async findAll(search: SearchRedaccionDto) {
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

    const data = await this.redaccionModel
      .find(filter)
      .populate('usuario_id')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.redaccionModel.countDocuments(filter);

    return ResponseHelper.success({ total, page, limit, data });
  }

  async findOne(id: string) {
    const redaccion = await this.redaccionModel.findById(id).populate('usuario_id');

    if (!redaccion) {
      throw new NotFoundException('Redacción no encontrada');
    }

    return ResponseHelper.success(redaccion);
  }

  async update(id: string, dto: UpdateRedaccionDto) {
    const redaccion = await this.redaccionModel.findById(id);

    if (!redaccion) {
      throw new NotFoundException('Redacción no encontrada');
    }

    const updated = await this.redaccionModel.findByIdAndUpdate(id, dto, { new: true });

    return ResponseHelper.success(updated, 200);
  }

  async remove(id: string) {
    const redaccion = await this.redaccionModel.findById(id);

    if (!redaccion) {
      throw new NotFoundException('Redacción no encontrada');
    }

    const deleted = await this.redaccionModel.findByIdAndUpdate(id, { activo: false }, { new: true });

    return ResponseHelper.success(deleted, 200);
  }
}
