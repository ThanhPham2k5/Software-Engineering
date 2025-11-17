import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Student } from './student.schema';
import { Schedule } from './schedule.schema';

@Schema({ timestamps: true })
export class ScheduleDetail {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
  })
  ScheduleID: Schedule;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  })
  StudentID: Student;

  @Prop({ required: true })
  Status: boolean;
}

export const ScheduleDetailSchema =
  SchemaFactory.createForClass(ScheduleDetail);
