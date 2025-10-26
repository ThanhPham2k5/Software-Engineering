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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { RoutesService } from 'src/routes/routes.service';
import { ManagersService } from 'src/managers/managers.service';
import { DriversService } from 'src/drivers/drivers.service';
import { BusesService } from 'src/buses/buses.service';
import mongoose from 'mongoose';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private scheduleService: SchedulesService,
    private managerService: ManagersService,
    private driverService: DriversService,
    private busService: BusesService,
    private routeService: RoutesService,
  ) {}

  @Post()
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    const managerValid = await this.managerService.getManagerById(
      createScheduleDto.ManagerID,
    );
    if (!managerValid)
      throw new HttpException('Mã quản lý không chính xác.', 404);

    const driverValid = await this.driverService.getDriverById(
      createScheduleDto.DriverID,
    );
    if (!driverValid)
      throw new HttpException('Mã tài xế không chính xác.', 404);

    const busValid = await this.busService.getBusById(createScheduleDto.BusID);
    if (!busValid) throw new HttpException('Mã xe buýt không chính xác.', 404);

    const routeValid = await this.routeService.getRouteById(
      createScheduleDto.RouteID,
    );
    if (!routeValid)
      throw new HttpException('Mã tuyến đường không chính xác.', 404);

    const postSchedule = this.scheduleService.createSchedule(createScheduleDto);
    if (!postSchedule)
      throw new HttpException('Thêm lịch trình không thành công', 404);
    return postSchedule;
  }

  @Get()
  async getSchedules() {
    const getSchedules = await this.scheduleService.getSchedules();
    if (!getSchedules)
      throw new HttpException('Lấy danh sách lịch trình không thành công', 404);
    return getSchedules;
  }

  @Get(':id')
  async getScheduleById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy lịch trình.', 400);

    const findSchedule = await this.scheduleService.getScheduleById(id);
    if (!findSchedule)
      throw new HttpException('Tìm lịch trình không thành công.', 404);
    return findSchedule;
  }

  @Patch(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy lịch trình.', 400);

    if (updateScheduleDto.ManagerID) {
      const managerValid = await this.managerService.getManagerById(
        updateScheduleDto.ManagerID,
      );
      if (!managerValid)
        throw new HttpException('Mã quản lý không chính xác.', 404);
    }

    if (updateScheduleDto.DriverID) {
      const driverValid = await this.driverService.getDriverById(
        updateScheduleDto.DriverID,
      );
      if (!driverValid)
        throw new HttpException('Mã tài xế không chính xác.', 404);
    }

    if (updateScheduleDto.BusID) {
      const busValid = await this.busService.getBusById(
        updateScheduleDto.BusID,
      );
      if (!busValid)
        throw new HttpException('Mã xe buýt không chính xác.', 404);
    }

    if (updateScheduleDto.RouteID) {
      const routeValid = await this.routeService.getRouteById(
        updateScheduleDto.RouteID,
      );
      if (!routeValid)
        throw new HttpException('Mã tuyến đường không chính xác.', 404);
    }

    const updateSchedule = await this.scheduleService.updateSchedule(
      id,
      updateScheduleDto,
    );
    if (!updateSchedule)
      throw new HttpException('Cập nhật lịch trình không thành công.', 404);
    return updateSchedule;
  }

  // temporary method
  @Delete(':id')
  async deleteSchedule(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy lịch trình.', 400);

    const deleteSchedule = await this.scheduleService.deleteSchedule(id);
    if (!deleteSchedule)
      throw new HttpException('Xóa lịch trình không thành công.', 404);
    return deleteSchedule;
  }
}
