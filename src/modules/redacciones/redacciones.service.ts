import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  private validateObjectId(value: string, fieldName: string) {
    if (!value || !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`El campo ${fieldName} es inválido`);
    }

    return new Types.ObjectId(value);
  }

  private sanitizeRedaccion(redaccion: any) {
    const plain = redaccion.toObject ? redaccion.toObject() : redaccion;

    if (plain.usuario_id && !Types.ObjectId.isValid(plain.usuario_id.toString())) {
      plain.usuario_id = null;
    }

    return plain;
  }

  async create(dto: CreateRedaccionDto) {
    if (dto.usuario_id) {
      this.validateObjectId(dto.usuario_id, 'usuario_id');
    }

    const created = await this.redaccionModel.create(dto);
    return ResponseHelper.success(this.sanitizeRedaccion(created), 201);
  }

    async findAll(){
        const redacciones=
        await this.redaccionModel.find({activo: true});

        return ResponseHelper.success(redacciones);
    }

  async findOne(id: string) {
    const objectId = this.validateObjectId(id, 'id');
    const redaccion = await this.redaccionModel.findById(objectId).lean();

    if (!redaccion) {
      throw new NotFoundException('Redacción no encontrada');
    }

    return ResponseHelper.success(this.sanitizeRedaccion(redaccion));
  }

  async update(id: string, dto: UpdateRedaccionDto) {
    const objectId = this.validateObjectId(id, 'id');
    const redaccion = await this.redaccionModel.findById(objectId).lean();

    if (!redaccion) {
      throw new NotFoundException('Redacción no encontrada');
    }

    const updated = await this.redaccionModel.findByIdAndUpdate(objectId, dto, { new: true }).lean();

    return ResponseHelper.success(updated, 200);
  }

  async findInactive() {
    const redacciones = await this.redaccionModel.find({ activo: false }).lean();
    return ResponseHelper.success(redacciones);
  }

  async partialUpdate(id: string, dto: UpdateRedaccionDto) {
    const objectId = this.validateObjectId(id, 'id');
    const redaccion = await this.redaccionModel.findById(objectId).lean();

    if (!redaccion) {
      throw new NotFoundException('Redacción no encontrada');
    }

    const updated = await this.redaccionModel.findByIdAndUpdate(objectId, { $set: dto }, { new: true }).lean();

    return ResponseHelper.success(updated, 200);
  }

  async restore(id: string) {
    const objectId = this.validateObjectId(id, 'id');
    const redaccion = await this.redaccionModel.findById(objectId).lean();

    if (!redaccion) {
      throw new NotFoundException('Redacción no encontrada');
    }

    const restored = await this.redaccionModel.findByIdAndUpdate(objectId, { activo: true }, { new: true }).lean();

    return ResponseHelper.success(restored, 200);
  }

  async remove(id: string) {
    const objectId = this.validateObjectId(id, 'id');
    const redaccion = await this.redaccionModel.findById(objectId).lean();

    if (!redaccion) {
      throw new NotFoundException('Redacción no encontrada');
    }

    const deleted = await this.redaccionModel.findByIdAndUpdate(objectId, { activo: false }, { new: true }).lean();

    return ResponseHelper.success(deleted, 200);
  }
}
