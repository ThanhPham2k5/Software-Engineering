import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timestamp } from 'rxjs';

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  AccountName: string;

  @Prop({ required: true })
  Password: string;

  @Prop({ required: true, enum: ['Quản lý', 'Tài xế', 'Phụ huynh'] })
  Role: string;

  @Prop({ required: true })
  Status: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
