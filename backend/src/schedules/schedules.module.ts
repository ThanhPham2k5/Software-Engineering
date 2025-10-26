import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from 'src/schemas/schedule.schema';
import { ManagersModule } from 'src/managers/managers.module';
import { DriversModule } from 'src/drivers/drivers.module';
import { BusesModule } from 'src/buses/buses.module';
import { RoutesModule } from 'src/routes/routes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Schedule.name,
        schema: ScheduleSchema,
      },
    ]),
    ManagersModule,
    DriversModule,
    BusesModule,
    RoutesModule,
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
