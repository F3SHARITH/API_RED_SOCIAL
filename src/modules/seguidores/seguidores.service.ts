import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateSeguidorDto } from 'src/modules/seguidores/dto/create-seguidor.dto';
import { SearchSeguidorDto } from 'src/modules/seguidores/dto/search-seguidor.dto';
import { Seguidor, SeguidorDocument } from './schemas/seguidor.schema';

@Injectable()
export class SeguidoresService {
  constructor(
    @InjectModel(Seguidor.name)
    private readonly seguidorModel: Model<SeguidorDocument>,
  ) {}

  async create(dto: CreateSeguidorDto) {
    const created = await this.seguidorModel.create(dto);
    return ResponseHelper.success(created, 201);
  }

  async findAll(search: SearchSeguidorDto) {
    const filter: any = { activo: true };

    if (search.seguidor_id) {
      filter.seguidor_id = search.seguidor_id;
    }

    if (search.seguido_id) {
      filter.seguido_id = search.seguido_id;
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    const data = await this.seguidorModel
      .find(filter)
      .populate('seguidor_id')
      .populate('seguido_id')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.seguidorModel.countDocuments(filter);

    return ResponseHelper.success({ total, page, limit, data });
  }

  async findOne(id: string) {
    const seguidor = await this.seguidorModel.findById(id).populate('seguidor_id').populate('seguido_id');

    if (!seguidor) {
      throw new NotFoundException('Relación de seguimiento no encontrada');
    }

    return ResponseHelper.success(seguidor);
  }

  async remove(id: string) {
    const seguidor = await this.seguidorModel.findById(id);

    if (!seguidor) {
      throw new NotFoundException('Relación de seguimiento no encontrada');
    }

    const deleted = await this.seguidorModel.findByIdAndUpdate(id, { activo: false }, { new: true });

    return ResponseHelper.success(deleted, 200);
  }
}
