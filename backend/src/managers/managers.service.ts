import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager } from 'src/schemas/manager.schema';
import { CreateManagerDTO } from './dto/createManagerDTO';
import { UpdateManagerDTO } from './dto/updateManagerDTO';

@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<Manager>,
  ) {}

  async createManager(createManagerDTO: CreateManagerDTO) {
    const newManager = new this.managerModel(createManagerDTO);
    return newManager.save();
  }

  getManagers() {
    return this.managerModel.find();
  }

  getManagerById(id: string) {
    return this.managerModel.findById(id).populate('AccountID');
  }

  updateManager(id: string, updateManagerDTO: UpdateManagerDTO) {
    return this.managerModel.findByIdAndUpdate(id, updateManagerDTO, {
      new: true,
    });
  }

  // temporary method
  deleteManager(id: string) {
    return this.managerModel.findByIdAndDelete(id);
  }
}
