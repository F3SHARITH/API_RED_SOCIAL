import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  private validateObjectId(value: string, fieldName: string) {
    if (!value || !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`El campo ${fieldName} es inválido`);
    }

    return new Types.ObjectId(value);
  }

  async create(dto: CreateSeguidorDto) {
    const seguidorId = this.validateObjectId(dto.seguidor_id, 'seguidor_id');
    const seguidoId = this.validateObjectId(dto.seguido_id, 'seguido_id');

    const created = await this.seguidorModel.create({
      seguidor_id: seguidorId,
      seguido_id: seguidoId,
    });
    return ResponseHelper.success(created, 201);
  }

  async findAll(search: SearchSeguidorDto = {}) {
    const filter: any = { activo: true };

    if (search.seguidor_id) {
      filter.seguidor_id = this.validateObjectId(search.seguidor_id, 'seguidor_id');
    }

    if (search.seguido_id) {
      filter.seguido_id = this.validateObjectId(search.seguido_id, 'seguido_id');
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    const data = await this.seguidorModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await this.seguidorModel.countDocuments(filter);

    return ResponseHelper.success({ total, page, limit, data });
  }

  async findOne(id: string) {
    const objectId = this.validateObjectId(id, 'id');
    const seguidor = await this.seguidorModel.findById(objectId).lean();

    if (!seguidor) {
      throw new NotFoundException('Relación de seguimiento no encontrada');
    }

    return ResponseHelper.success(seguidor);
  }

  async findInactive() {
    const seguidores = await this.seguidorModel.find({ activo: false });
    return ResponseHelper.success(seguidores);
  }

  async partialUpdate(id: string, dto: CreateSeguidorDto) {
    const objectId = this.validateObjectId(id, 'id');
    const seguidor = await this.seguidorModel.findById(objectId);

    if (!seguidor) {
      throw new NotFoundException('Relación de seguimiento no encontrada');
    }

    const updated = await this.seguidorModel.findByIdAndUpdate(objectId, { $set: dto }, { new: true });

    return ResponseHelper.success(updated, 200);
  }

  async restore(id: string) {
    const objectId = this.validateObjectId(id, 'id');
    const seguidor = await this.seguidorModel.findById(objectId);

    if (!seguidor) {
      throw new NotFoundException('Relación de seguimiento no encontrada');
    }

    const restored = await this.seguidorModel.findByIdAndUpdate(objectId, { activo: true }, { new: true });

    return ResponseHelper.success(restored, 200);
  }

  async remove(id: string) {
    const objectId = this.validateObjectId(id, 'id');
    const seguidor = await this.seguidorModel.findById(objectId);

    if (!seguidor) {
      throw new NotFoundException('Relación de seguimiento no encontrada');
    }

    const deleted = await this.seguidorModel.findByIdAndUpdate(objectId, { activo: false }, { new: true });

    return ResponseHelper.success(deleted, 200);
  }
}
