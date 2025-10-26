import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class ScheduleDetail {
  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  ScheduleID: string;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  StudentID: string;

  @Prop({ required: true })
  Status: boolean;
}

export const ScheduleDetailSchema =
  SchemaFactory.createForClass(ScheduleDetail);
