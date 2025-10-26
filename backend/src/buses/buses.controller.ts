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
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import mongoose from 'mongoose';

@Controller('buses')
export class BusesController {
  constructor(private busService: BusesService) {}

  @Post()
  createBuse(@Body() createBuseDto: CreateBusDto) {
    const postBuse = this.busService.createBus(createBuseDto);
    if (!postBuse)
      throw new HttpException('Thêm xe buýt không thành công', 404);
    return postBuse;
  }

  @Get()
  async getBuses() {
    const getBuses = await this.busService.getBuses();
    if (!getBuses)
      throw new HttpException('Lấy danh sách xe buýt không thành công.', 404);
    return getBuses;
  }

  @Get(':id')
  async getBuseById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy xe buýt.', 400);
    const findBuse = await this.busService.getBusById(id);
    if (!findBuse)
      throw new HttpException('Tìm xe buýt không thành công.', 404);
    return findBuse;
  }

  @Patch(':id')
  async updateBuse(
    @Param('id') id: string,
    @Body() updateBuseDTO: UpdateBusDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy xe buýt.', 400);
    const updateBuse = await this.busService.updateBus(id, updateBuseDTO);
    if (!updateBuse)
      throw new HttpException('Cập nhật xe buýt không thành công.', 404);
    return updateBuse;
  }

  @Delete(':id')
  async deleteBuse(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy xe buýt.', 400);
    const deleteBuse = this.busService.deleteBus(id);
    if (!deleteBuse)
      throw new HttpException('Xóa dữ liệu không thành công.', 404);
    return deleteBuse;
  }
}
