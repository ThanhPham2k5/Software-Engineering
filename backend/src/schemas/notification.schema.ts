import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  Title: string;

  @Prop({ required: true })
  Body: string;

  @Prop({ required: true })
  Status: boolean;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  AccountID: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
