import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Route } from 'src/schemas/route.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route.name) private routeModel: Model<Route>) {}

  createRoute(createRouteDto: CreateRouteDto) {
    const newRoute = new this.routeModel(createRouteDto);
    return newRoute.save();
  }

  getRoutes() {
    return this.routeModel.find();
  }

  getRouteById(id: string) {
    return this.routeModel.findById(id);
  }

  updateRoute(id: string, updateRouteDto: UpdateRouteDto) {
    return this.routeModel.findByIdAndUpdate(id, updateRouteDto, {
      new: true,
    });
  }

  deleteRoute(id: string) {
    return this.routeModel.findByIdAndDelete(id);
  }
}
