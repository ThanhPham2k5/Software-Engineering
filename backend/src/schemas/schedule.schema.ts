import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  ManagerID: string;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  DriverID: string;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  BusID: string;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  RouteID: string;

  @Prop({ required: true })
  Duration: Number;

  @Prop({ required: true })
  Status: boolean;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
