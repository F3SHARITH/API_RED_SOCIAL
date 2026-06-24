import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeguidoresController } from './seguidores.controller';
import { SeguidoresService } from './seguidores.service';
import { Seguidor, SeguidorSchema } from './schemas/seguidor.schema';

@Module({
  controllers: [SeguidoresController],
  providers: [SeguidoresService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Seguidor.name,
        schema: SeguidorSchema,
      },
    ]),
  ],
})
export class SeguidoresModule {}
