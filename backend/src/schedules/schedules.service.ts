import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from 'src/schemas/schedule.schema';
import { Model } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name)
    private ScheduleModel: Model<Schedule>,
  ) {}

  createSchedule(createScheduleDto: CreateScheduleDto) {
    const newSchedule = new this.ScheduleModel(createScheduleDto);
    return newSchedule.save();
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

  updateSchedule(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.ScheduleModel.findByIdAndUpdate(id, updateScheduleDto, {
      new: true,
    });
  }

  deleteSchedule(id: string) {
    return this.ScheduleModel.findByIdAndDelete(id);
  }
}
