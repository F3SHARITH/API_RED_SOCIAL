import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RedaccionDocument = Redaccion & Document;

@Schema({
  timestamps: true,
})
export class Redaccion {
  @Prop({ required: true })
  titulo!: string;

  @Prop({ required: true })
  contenido!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  usuario_id!: Types.ObjectId;

  @Prop({ default: true })
  activo!: boolean;
}

export const RedaccionSchema = SchemaFactory.createForClass(Redaccion);
