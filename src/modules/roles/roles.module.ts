import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema, Role } from './schemas/roles.schemas';


@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports:[
    MongooseModule.forFeature([
      { 
        name: Role.name, 
        schema: RoleSchema 
      },
    ]),
  ]
})
export class RolesModule {}
