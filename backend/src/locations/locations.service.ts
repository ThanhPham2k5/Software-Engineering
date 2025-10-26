import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from 'src/schemas/location.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  createLocation(createLocationDto: CreateLocationDto) {
    const newLocation = new this.locationModel(createLocationDto);
    return newLocation.save();
  }

  getLocations() {
    return this.locationModel.find();
  }

  getLocationById(id: string) {
    return this.locationModel.findById(id);
  }

  updateLocation(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationModel.findByIdAndUpdate(id, updateLocationDto, {
      new: true,
    });
  }

  deleteLocation(id: string) {
    return this.locationModel.findByIdAndDelete(id);
  }
}
