import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RouteDetail } from 'src/schemas/routeDetail.schema';
import { CreateRouteDetailDto } from './dto/create-route-detail.dto';
import { UpdateRouteDetailDto } from './dto/update-route-detail.dto';

@Injectable()
export class RouteDetailsService {
  constructor(
    @InjectModel(RouteDetail.name)
    private routeDetailModel: Model<RouteDetail>,
  ) {}

  createRouteDetail(createRouteDetailDto: CreateRouteDetailDto) {
    const newRouteDetail = new this.routeDetailModel(createRouteDetailDto);
    return newRouteDetail.save();
  }

  getRouteDetails() {
    return this.routeDetailModel.find();
  }

  getRouteDetailById(id: string) {
    return this.routeDetailModel.findById(id);
  }

  updateRouteDetail(id: string, updateRouteDetailDto: UpdateRouteDetailDto) {
    return this.routeDetailModel.findByIdAndUpdate(id, updateRouteDetailDto, {
      new: true,
    });
  }

  deleteRouteDetail(id: string) {
    return this.routeDetailModel.findByIdAndDelete(id);
  }
}
