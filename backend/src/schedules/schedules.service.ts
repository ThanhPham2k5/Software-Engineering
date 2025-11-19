import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from 'src/schemas/schedule.schema';
import { Model } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleDetailsService } from '../schedule-details/schedule-details.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name)
    private ScheduleModel: Model<Schedule>,
    private scheduleDetailService: ScheduleDetailsService,
  ) {}

  // createSchedule(createScheduleDto: CreateScheduleDto) {
  //   const newSchedule = new this.ScheduleModel(createScheduleDto);
  //   return newSchedule.save();
  // }

  async createSchedule(createScheduleDto: CreateScheduleDto) {
    const { Students, ...scheduleData } = createScheduleDto;

    const newSchedule = new this.ScheduleModel(scheduleData);
    const savedSchedule = await newSchedule.save();

    if (Students && Students.length > 0) {
      try {
        await this.scheduleDetailService.createManyScheduleDetails(
          savedSchedule._id.toString(),
          Students,
        );
      } catch (error) {
        console.error('Lỗi từ ScheduleDetailsService:', error);
      }
    }

    return savedSchedule;
  }

  getSchedules() {
    return this.ScheduleModel.find().populate(['DriverID', 'BusID', 'RouteID']);
  }

  getScheduleById(id: string) {
    return this.ScheduleModel.findById(id).populate([
      'DriverID',
      'BusID',
      'RouteID',
    ]);
  }

  // updateSchedule(id: string, updateScheduleDto: UpdateScheduleDto) {
  //   return this.ScheduleModel.findByIdAndUpdate(id, updateScheduleDto, {
  //     new: true,
  //   });
  // }

  async updateSchedule(id: string, updateScheduleDto: UpdateScheduleDto) {
    const { Students, ...updateData } = updateScheduleDto;

    const updatedSchedule = await this.ScheduleModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (Students) {
      try {
        await this.scheduleDetailService.updateStudentListForSchedule(
          id,
          Students,
        );
      } catch (error) {
        console.error('Lỗi khi cập nhật danh sách học sinh:', error);
      }
    }

    return updatedSchedule;
  }

  deleteSchedule(id: string) {
    return this.ScheduleModel.findByIdAndDelete(id);
  }
}
