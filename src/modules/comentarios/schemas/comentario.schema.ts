import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComentarioDocument = Comentario & Document;

@Schema({
  timestamps: true,
})
export class Comentario {
  @Prop({ required: true })
  texto!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  usuario_id!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Publicacion',
  })
  publicacion_id!: Types.ObjectId;

  @Prop({ default: true })
  activo!: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);
