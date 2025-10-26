import { Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from 'src/schemas/bus.schema';
import { Model } from 'mongoose';

@Injectable()
export class BusesService {
  constructor(@InjectModel(Bus.name) private busModel: Model<Bus>) {}

  createBus(createBusDto: CreateBusDto) {
    const newBus = new this.busModel(createBusDto);
    return newBus.save();
  }

  getBuses() {
    return this.busModel.find();
  }

  getBusById(id: string) {
    return this.busModel.findById(id);
  }

  updateBus(id: string, updateBusDto: UpdateBusDto) {
    return this.busModel.findByIdAndUpdate(id, updateBusDto, {
      new: true,
    });
  }

  deleteBus(id: string) {
    return this.busModel.findByIdAndDelete(id);
  }
}
