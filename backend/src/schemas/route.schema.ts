import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Route {
  @Prop({ required: true })
  RouteName: string;

  @Prop({ required: true })
  Status: boolean;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
