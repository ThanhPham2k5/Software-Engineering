import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bus, BusSchema } from 'src/schemas/bus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bus.name,
        schema: BusSchema,
      },
    ]),
  ],
  controllers: [BusesController],
  providers: [BusesService],
  exports: [BusesService],
})
export class BusesModule {}
