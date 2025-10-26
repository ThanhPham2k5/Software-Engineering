import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Driver {
  @Prop({ required: true })
  DriverName: string;

  @Prop({ required: true, enum: ['Nam', 'Nữ'] })
  Gender: string;

  @Prop({ required: true })
  Phone: string;

  @Prop({ required: true })
  Address: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId })
  AccountID: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
