import { Injectable } from '@nestjs/common';
import { CreateScheduleDetailDto } from './dto/create-schedule-detail.dto';
import { UpdateScheduleDetailDto } from './dto/update-schedule-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleDetail } from 'src/schemas/scheduleDetail.schema';
import { Model } from 'mongoose';

@Injectable()
export class ScheduleDetailsService {
  constructor(
    @InjectModel(ScheduleDetail.name)
    private ScheduleDetailModel: Model<ScheduleDetail>,
  ) {}

  createScheduleDetail(createScheduleDetailDto: CreateScheduleDetailDto) {
    const newScheduleDetail = new this.ScheduleDetailModel(
      createScheduleDetailDto,
    );
    return newScheduleDetail.save();
  }

  getScheduleDetails() {
    return this.ScheduleDetailModel.find().populate(['StudentID']);
  }

  getScheduleDetailById(id: string) {
    return this.ScheduleDetailModel.findById(id);
  }

  getAllScheduleDetailById(id: string) {
    return this.ScheduleDetailModel.find({ ScheduleID: id }).populate([
      'StudentID',
    ]);
  }

  updateScheduleDetail(
    id: string,
    updateScheduleDetailDto: UpdateScheduleDetailDto,
  ) {
    return this.ScheduleDetailModel.findByIdAndUpdate(
      id,
      updateScheduleDetailDto,
      {
        new: true,
      },
    );
  }

  deleteScheduleDetail(id: string) {
    return this.ScheduleDetailModel.findByIdAndDelete(id);
  }
}
