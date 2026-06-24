import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { Comentario, ComentarioSchema } from './schemas/comentario.schema';

@Module({
  controllers: [ComentariosController],
  providers: [ComentariosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Comentario.name,
        schema: ComentarioSchema,
      },
    ]),
  ],
})
export class ComentariosModule {}
