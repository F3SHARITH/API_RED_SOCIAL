import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedaccionesController } from './redacciones.controller';
import { RedaccionesService } from './redacciones.service';
import { Redaccion, RedaccionSchema } from './schemas/redaccion.schema';

@Module({
  controllers: [RedaccionesController],
  providers: [RedaccionesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Redaccion.name,
        schema: RedaccionSchema,
      },
    ]),
  ],
})
export class RedaccionesModule {}
