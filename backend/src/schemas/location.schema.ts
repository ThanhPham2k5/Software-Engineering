import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true })
  LocationName: string;

  @Prop({ required: true })
  Address: string;

  @Prop({ required: true })
  Status: boolean;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
