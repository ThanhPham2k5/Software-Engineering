import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from 'src/schemas/driver.schema';
import { Model } from 'mongoose';
import { CreateDriverDTO } from './dto/create-driver.dto';
import { UpdateDriverDTO } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {}

  async createDriver(createDriverDTO: CreateDriverDTO) {
    const newDriver = new this.driverModel(createDriverDTO);
    return newDriver.save();
  }

  getDrivers() {
    return this.driverModel.find();
  }

  getDriverById(id: string) {
    return this.driverModel.findById(id).populate('AccountID');
  }

  updateDriver(id: string, updateDriverDTO: UpdateDriverDTO) {
    return this.driverModel.findByIdAndUpdate(id, updateDriverDTO, {
      new: true,
    });
  }

  // temporary method
  deleteDriver(id: string) {
    return this.driverModel.findByIdAndDelete(id);
  }
}
