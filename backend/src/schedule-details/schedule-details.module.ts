import { Module } from '@nestjs/common';
import { ScheduleDetailsService } from './schedule-details.service';
import { ScheduleDetailsController } from './schedule-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ScheduleDetail,
  ScheduleDetailSchema,
} from 'src/schemas/scheduleDetail.schema';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ScheduleDetail.name,
        schema: ScheduleDetailSchema,
      },
    ]),
    SchedulesModule,
    StudentsModule,
  ],
  controllers: [ScheduleDetailsController],
  providers: [ScheduleDetailsService],
})
export class ScheduleDetailsModule {}
