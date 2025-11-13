import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Route } from './route.schema';
import { Driver } from './driver.schema';
import { Bus } from './bus.schema';

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  ManagerID: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
  DriverID: Driver;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Bus' })
  BusID: Bus;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Route' })
  RouteID: Route;

  @Prop({ required: true })
  Duration: Number;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  Status: boolean;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
