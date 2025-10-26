import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Bus {
  @Prop({ required: true })
  BusLicense: string;

  @Prop({ required: true })
  Capacity: Number;

  @Prop({ required: true })
  Status: boolean;
}

export const BusSchema = SchemaFactory.createForClass(Bus);
