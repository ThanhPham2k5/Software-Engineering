import { HttpException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from 'src/schemas/notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  createNotification(createNotificationDto: CreateNotificationDto) {
    const newNotification = new this.notificationModel(createNotificationDto);
    return newNotification.save();
  }

  getNotifications() {
    return this.notificationModel.find();
  }

  getNotificationById(id: string) {
    return this.notificationModel.findById(id);
  }

  updateNotification(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationModel.findByIdAndUpdate(id, updateNotificationDto, {
      new: true,
    });
  }

  deleteNotification(id: string) {
    return this.notificationModel.findByIdAndDelete(id);
  }
}
