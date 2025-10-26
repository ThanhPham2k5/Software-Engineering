import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'src/schemas/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  createMessage(createMessageDto: CreateMessageDto) {
    const newMessage = new this.messageModel(createMessageDto);
    return newMessage.save();
  }

  getMessages() {
    return this.messageModel.find();
  }

  getMessageById(id: string) {
    return this.messageModel.findById(id);
  }

  updateMessage(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messageModel.findByIdAndUpdate(id, updateMessageDto, {
      new: true,
    });
  }

  deleteMessage(id: string) {
    return this.messageModel.findByIdAndDelete(id);
  }
}
