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
import { RouteDetailsService } from './route-details.service';
import { LocationsService } from 'src/locations/locations.service';
import { RoutesService } from 'src/routes/routes.service';
import { CreateRouteDetailDto } from './dto/create-route-detail.dto';
import mongoose from 'mongoose';
import { UpdateRouteDetailDto } from './dto/update-route-detail.dto';

@Controller('route-details')
export class RouteDetailsController {
  constructor(
    private routeDetailsService: RouteDetailsService,
    private locationService: LocationsService,
    private routeService: RoutesService,
  ) {}

  @Post()
  async createRouteDetail(@Body() createRouteDetailDto: CreateRouteDetailDto) {
    const routeValid = await this.routeService.getRouteById(
      createRouteDetailDto.RouteID,
    );
    if (!routeValid)
      throw new HttpException('Mã tuyến đường không chính xác.', 404);

    const locationStartValid = await this.locationService.getLocationById(
      createRouteDetailDto.LocationStartID,
    );
    if (!locationStartValid)
      throw new HttpException('Mã trạm bắt đầu không chính xác.', 404);

    const locationEndValid = await this.locationService.getLocationById(
      createRouteDetailDto.LocationStartID,
    );
    if (!locationEndValid)
      throw new HttpException('Mã trạm kết thúc không chính xác.', 404);

    const postRouteDetail =
      this.routeDetailsService.createRouteDetail(createRouteDetailDto);
    if (!postRouteDetail)
      throw new HttpException('Thêm chi tiết tuyến không thành công', 404);
    return postRouteDetail;
  }

  @Get()
  async getRouteDetails() {
    const getRouteDetails = await this.routeDetailsService.getRouteDetails();
    if (!getRouteDetails)
      throw new HttpException(
        'Lấy danh sách chi tiết tuyến không thành công',
        404,
      );
    return getRouteDetails;
  }

  @Get(':id')
  async getRouteDetailById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('Không tìm thấy chi tiết tuyến.', 400);

    const findRouteDetail =
      await this.routeDetailsService.getRouteDetailById(id);
    if (!findRouteDetail)
      throw new HttpException('Tìm chi tiết tuyến không thành công.', 404);
    return findRouteDetail;
  }

  @Patch(':id')
  async updateRouteDetail(
    @Param('id') id: string,
    @Body() updateRouteDetailDto: UpdateRouteDetailDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('Không tìm thấy chi tiết tuyến.', 400);

    if (updateRouteDetailDto.RouteID) {
      const routeValid = await this.routeService.getRouteById(
        updateRouteDetailDto.RouteID,
      );
      if (!routeValid)
        throw new HttpException('Mã tuyến đường không chính xác.', 404);
    }

    if (updateRouteDetailDto.LocationStartID) {
      const locationStartValid = await this.locationService.getLocationById(
        updateRouteDetailDto.LocationStartID,
      );
      if (!locationStartValid)
        throw new HttpException('Mã trạm bắt đầu không chính xác.', 404);
    }

    if (updateRouteDetailDto.LocationEndID) {
      const locationEndValid = await this.locationService.getLocationById(
        updateRouteDetailDto.LocationStartID,
      );
      if (!locationEndValid)
        throw new HttpException('Mã trạm kết thúc không chính xác.', 404);
    }

    const updateRouteDetail = await this.routeDetailsService.updateRouteDetail(
      id,
      updateRouteDetailDto,
    );
    if (!updateRouteDetail)
      throw new HttpException('Tìm chi tiết tuyến không thành công.', 404);
    return updateRouteDetail;
  }

  // temporary method
  @Delete(':id')
  async deleteRouteDetail(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('Không tìm thấy chi tiết tuyến.', 400);

    const deleteRouteDetail =
      await this.routeDetailsService.deleteRouteDetail(id);
    if (!deleteRouteDetail)
      throw new HttpException('Tìm chi tiết tuyến không thành công.', 404);
    return deleteRouteDetail;
  }
}
