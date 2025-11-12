import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Location } from './location.schema';
import { Route } from './route.schema';

@Schema({ timestamps: true })
export class RouteDetail {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Route' })
  RouteID: Route;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  })
  LocationStartID: Location;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  })
  LocationEndID: Location;

  @Prop({ required: true })
  Distance: Number;

  @Prop({ required: true })
  Speed: Number;

  @Prop({ required: true })
  Order: Number;
}

export const RouteDetailSchema = SchemaFactory.createForClass(RouteDetail);
