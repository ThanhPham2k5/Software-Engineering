import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import mongoose from 'mongoose';

@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private accountService: AccountsService,
  ) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    const accountFromValid = await this.accountService.getAccountById(
      createMessageDto.AccountFromID,
    );
    if (!accountFromValid)
      throw new HttpException('Mã tài khoản gửi không chính xác.', 404);

    const accountToValid = await this.accountService.getAccountById(
      createMessageDto.AccountToID,
    );
    if (!accountToValid)
      throw new HttpException('Mã tài khoản nhận không chính xác.', 404);

    const postNotification =
      this.messagesService.createMessage(createMessageDto);
    if (!postNotification)
      throw new HttpException('Thêm tin nhắn không thành công', 404);
    return postNotification;
  }

  @Get()
  async getMessages() {
    const getNotifications = await this.messagesService.getMessages();
    if (!getNotifications)
      throw new HttpException('Lấy danh sách tin nhắn không thành công', 404);
    return getNotifications;
  }

  @Get(':id')
  async getMessageById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tin nhắn.', 400);

    const findNotification = await this.messagesService.getMessageById(id);
    if (!findNotification)
      throw new HttpException('Tìm tin nhắn không thành công.', 404);
    return findNotification;
  }

  @Patch(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tin nhắn.', 400);

    if (updateMessageDto.AccountFromID) {
      const accountValid = await this.accountService.getAccountById(
        updateMessageDto.AccountFromID,
      );
      if (!accountValid)
        throw new HttpException('Mã tài khoản gửi không chính xác.', 404);
    }

    if (updateMessageDto.AccountToID) {
      const accountValid = await this.accountService.getAccountById(
        updateMessageDto.AccountToID,
      );
      if (!accountValid)
        throw new HttpException('Mã tài khoản nhận không chính xác.', 404);
    }

    const updateNotification = await this.messagesService.updateMessage(
      id,
      updateMessageDto,
    );
    if (!updateNotification)
      throw new HttpException('Tìm tin nhắn không thành công.', 404);
    return updateNotification;
  }

  // temporary method
  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tin nhắn.', 400);

    const deleteNotification = await this.messagesService.deleteMessage(id);
    if (!deleteNotification)
      throw new HttpException('Tìm tin nhắn không thành công.', 404);
    return deleteNotification;
  }
}
