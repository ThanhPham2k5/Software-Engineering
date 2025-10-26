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
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import mongoose from 'mongoose';
import { UpdateRouteDto } from './dto/update-route.dto';

@Controller('routes')
export class RoutesController {
  constructor(private routeService: RoutesService) {}

  @Post()
  createRoute(@Body() createRouteDto: CreateRouteDto) {
    const postRoute = this.routeService.createRoute(createRouteDto);
    if (!postRoute)
      throw new HttpException('Thêm tuyến đường không thành công', 404);
    return postRoute;
  }

  @Get()
  async getRoutes() {
    const getRoutes = await this.routeService.getRoutes();
    if (!getRoutes)
      throw new HttpException(
        'Lấy danh sách tuyến đường không thành công.',
        404,
      );
    return getRoutes;
  }

  @Get(':id')
  async getRouteById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tuyến đường.', 400);
    const findRoute = await this.routeService.getRouteById(id);
    if (!findRoute)
      throw new HttpException('Tìm tuyến đường không thành công.', 404);
    return findRoute;
  }

  @Patch(':id')
  async updateRoute(
    @Param('id') id: string,
    @Body() updateRouteDTO: UpdateRouteDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tuyến đường.', 400);
    const updateRoute = await this.routeService.updateRoute(id, updateRouteDTO);
    if (!updateRoute)
      throw new HttpException('Cập nhật tuyến đường không thành công.', 404);
    return updateRoute;
  }

  @Delete(':id')
  async deleteRoute(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tuyến đường.', 400);
    const deleteRoute = this.routeService.deleteRoute(id);
    if (!deleteRoute)
      throw new HttpException('Xóa dữ liệu không thành công.', 404);
    return deleteRoute;
  }
}
