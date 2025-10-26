import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  Title: string;

  @Prop({ required: true })
  Body: string;

  @Prop({ required: true })
  Status: boolean;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  AccountFromID: string;

  @Prop({ required: true, Type: mongoose.Types.ObjectId })
  AccountToID: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
