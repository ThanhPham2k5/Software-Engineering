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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import mongoose from 'mongoose';
import { AccountsService } from 'src/accounts/accounts.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private notificationsService: NotificationsService,
    private accountService: AccountsService,
  ) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const accountValid = await this.accountService.getAccountById(
      createNotificationDto.AccountID,
    );
    if (!accountValid)
      throw new HttpException('Mã tài khoản không chính xác.', 404);

    const postNotification = this.notificationsService.createNotification(
      createNotificationDto,
    );
    if (!postNotification)
      throw new HttpException('Thêm thông báo không thành công', 404);
    return postNotification;
  }

  @Get()
  async getNotifications() {
    const getNotifications = await this.notificationsService.getNotifications();
    if (!getNotifications)
      throw new HttpException('Lấy danh sách thông báo không thành công', 404);
    return getNotifications;
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy thông báo.', 400);

    const findNotification =
      await this.notificationsService.getNotificationById(id);
    if (!findNotification)
      throw new HttpException('Tìm thông báo không thành công.', 404);
    return findNotification;
  }

  @Patch(':id')
  async updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy thông báo.', 400);

    if (updateNotificationDto.AccountID) {
      const accountValid = await this.accountService.getAccountById(
        updateNotificationDto.AccountID,
      );
      if (!accountValid)
        throw new HttpException('Mã tài khoản không chính xác.', 404);
    }

    const updateNotification =
      await this.notificationsService.updateNotification(
        id,
        updateNotificationDto,
      );
    if (!updateNotification)
      throw new HttpException('Tìm thông báo không thành công.', 404);
    return updateNotification;
  }

  // temporary method
  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy thông báo.', 400);

    const deleteNotification =
      await this.notificationsService.deleteNotification(id);
    if (!deleteNotification)
      throw new HttpException('Tìm thông báo không thành công.', 404);
    return deleteNotification;
  }
}
