import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class RouteDetail {
  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  RouteID: string;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  LocationStartID: string;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  LocationEndID: string;

  @Prop({ required: true })
  Distance: Number;

  @Prop({ required: true })
  Speed: Number;

  @Prop({ required: true })
  Order: Number;
}

export const RouteDetailSchema = SchemaFactory.createForClass(RouteDetail);
