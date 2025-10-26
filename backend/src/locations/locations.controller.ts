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
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import mongoose from 'mongoose';

@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationsService) {}

  @Post()
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    const postLocation = this.locationService.createLocation(createLocationDto);
    if (!postLocation)
      throw new HttpException('Thêm trạm không thành công', 404);
    return postLocation;
  }

  @Get()
  async getLocations() {
    const getLocations = await this.locationService.getLocations();
    if (!getLocations)
      throw new HttpException('Lấy danh sách trạm không thành công.', 404);
    return getLocations;
  }

  @Get(':id')
  async getLocationById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy trạm.', 400);
    const findLocation = await this.locationService.getLocationById(id);
    if (!findLocation)
      throw new HttpException('Tìm trạm không thành công.', 404);
    return findLocation;
  }

  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateLocationDTO: UpdateLocationDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy trạm.', 400);
    const updateLocation = await this.locationService.updateLocation(
      id,
      updateLocationDTO,
    );
    if (!updateLocation)
      throw new HttpException('Cập nhật trạm không thành công.', 404);
    return updateLocation;
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy trạm.', 400);
    const deleteLocation = this.locationService.deleteLocation(id);
    if (!deleteLocation)
      throw new HttpException('Xóa dữ liệu không thành công.', 404);
    return deleteLocation;
  }
}
