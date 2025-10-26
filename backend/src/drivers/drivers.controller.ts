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
import { DriversService } from './drivers.service';
import { CreateDriverDTO } from './dto/create-driver.dto';
import { UpdateDriverDTO } from './dto/update-driver.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import mongoose from 'mongoose';

@Controller('drivers')
export class DriversController {
  constructor(
    private driverService: DriversService,
    private accountService: AccountsService,
  ) {}

  @Post()
  async createDriver(@Body() createDriverDTO: CreateDriverDTO) {
    const accountValid = await this.accountService.getAccountById(
      createDriverDTO.AccountID,
    );
    if (!accountValid)
      throw new HttpException('Mã tài khoản không chính xác.', 404);

    const postDriver = await this.driverService.createDriver(createDriverDTO);
    if (!postDriver)
      throw new HttpException('Thêm tài xế không thành công.', 404);
    return postDriver;
  }

  @Get()
  async getDrivers() {
    const getDrivers = await this.driverService.getDrivers();
    if (!getDrivers)
      throw new HttpException('Lấy danh sách tài xế không thành công.', 404);
    return getDrivers;
  }

  @Get(':id')
  async getDriverById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tài xế.', 404);

    const findDriver = await this.driverService.getDriverById(id);
    if (!findDriver)
      throw new HttpException('Tìm tài xế không thành công.', 404);
    return findDriver;
  }

  @Patch(':id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDTO: UpdateDriverDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tài xế.', 400);

    if (updateDriverDTO.AccountID) {
      const accountValid = await this.accountService.getAccountById(
        updateDriverDTO.AccountID,
      );
      if (!accountValid)
        throw new HttpException('Mã tài khoản không chính xác.', 404);
    }

    const updateDriver = await this.driverService.updateDriver(
      id,
      updateDriverDTO,
    );
    if (!updateDriver)
      throw new HttpException('Cập nhật thông tin không thành công.', 404);
    return updateDriver;
  }

  // temporary method
  @Delete(':id')
  async deleteDriver(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tài xế.', 400);

    const deleteDriver = this.driverService.deleteDriver(id);
    if (!deleteDriver)
      throw new HttpException('Xóa dữ liệu không thành công.', 404);
    return deleteDriver;
  }
}
