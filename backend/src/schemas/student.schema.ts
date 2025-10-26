import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  StudentName: string;

  @Prop({ required: true, enum: ['Nam', 'Nữ'] })
  Gender: string;

  @Prop({ required: true })
  Address: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId })
  ParentID: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
