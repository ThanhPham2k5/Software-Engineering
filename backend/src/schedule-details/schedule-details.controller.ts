import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Query,
} from '@nestjs/common';
import { ScheduleDetailsService } from './schedule-details.service';
import { CreateScheduleDetailDto } from './dto/create-schedule-detail.dto';
import { UpdateScheduleDetailDto } from './dto/update-schedule-detail.dto';
import { StudentsService } from 'src/students/students.service';
import { SchedulesService } from 'src/schedules/schedules.service';
import mongoose from 'mongoose';

@Controller('schedule-details')
export class ScheduleDetailsController {
  constructor(
    private scheduleDetailService: ScheduleDetailsService,
    private scheduleService: SchedulesService,
    private studentService: StudentsService,
  ) {}

  @Post()
  async createScheduleDetail(
    @Body() createScheduleDetailDto: CreateScheduleDetailDto,
  ) {
    const scheduleValid = await this.scheduleService.getScheduleById(
      createScheduleDetailDto.ScheduleID,
    );
    if (!scheduleValid)
      throw new HttpException('Mã lịch trình không chính xác.', 404);

    const studentValid = await this.studentService.getStudentById(
      createScheduleDetailDto.StudentID,
    );
    if (!studentValid)
      throw new HttpException('Mã học sinh không chính xác.', 404);

    const postScheduleDetail = this.scheduleDetailService.createScheduleDetail(
      createScheduleDetailDto,
    );
    if (!postScheduleDetail)
      throw new HttpException('Thêm chi tiết lịch trình không thành công', 404);
    return postScheduleDetail;
  }

  @Get()
  async getScheduleDetails(@Query('scheduleid') scheduleid?: string) {
    if (scheduleid) {
      return this.scheduleDetailService.getAllScheduleDetailById(scheduleid);
    } else {
      const getScheduleDetails =
        await this.scheduleDetailService.getScheduleDetails();
      if (!getScheduleDetails)
        throw new HttpException(
          'Lấy danh sách chi tiết lịch trình không thành công',
          404,
        );
      return getScheduleDetails;
    }
  }

  @Get(':id')
  async getScheduleDetailById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('Không tìm thấy chi tiết lịch trình.', 400);

    const findScheduleDetail =
      await this.scheduleDetailService.getScheduleDetailById(id);
    if (!findScheduleDetail)
      throw new HttpException('Tìm chi tiết lịch trình không thành công.', 404);
    return findScheduleDetail;
  }

  @Patch(':id')
  async updateScheduleDetail(
    @Param('id') id: string,
    @Body() updateScheduleDetailDto: UpdateScheduleDetailDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('Không tìm thấy chi tiết lịch trình.', 400);

    if (updateScheduleDetailDto.ScheduleID) {
      const scheduleValid = await this.scheduleService.getScheduleById(
        updateScheduleDetailDto.ScheduleID,
      );
      if (!scheduleValid)
        throw new HttpException('Mã lịch trình không chính xác.', 404);
    }

    if (updateScheduleDetailDto.StudentID) {
      const studentValid = await this.studentService.getStudentById(
        updateScheduleDetailDto.StudentID,
      );
      if (!studentValid)
        throw new HttpException('Mã học sinh không chính xác.', 404);
    }

    const updateScheduleDetail =
      await this.scheduleDetailService.updateScheduleDetail(
        id,
        updateScheduleDetailDto,
      );
    if (!updateScheduleDetail)
      throw new HttpException('Tìm chi tiết lịch trình không thành công.', 404);
    return updateScheduleDetail;
  }

  // temporary method
  @Delete(':id')
  async deleteScheduleDetail(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('Không tìm thấy chi tiết lịch trình.', 400);

    const deleteScheduleDetail =
      await this.scheduleDetailService.deleteScheduleDetail(id);
    if (!deleteScheduleDetail)
      throw new HttpException('Tìm chi tiết lịch trình không thành công.', 404);
    return deleteScheduleDetail;
  }
}
