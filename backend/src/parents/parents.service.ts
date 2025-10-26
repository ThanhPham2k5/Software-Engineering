import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent } from 'src/schemas/parent.schema';
import { CreateParentDTO } from './dto/create-parent.dto';
import { UpdateParentDTO } from './dto/update-parent.dto';

@Injectable()
export class ParentsService {
  constructor(@InjectModel(Parent.name) private parentModel: Model<Parent>) {}

  async createParent(createParentDTO: CreateParentDTO) {
    const newParent = new this.parentModel(createParentDTO);
    return newParent.save();
  }

  getParents() {
    return this.parentModel.find();
  }

  getParentById(id: string) {
    return this.parentModel.findById(id).populate('AccountID');
  }

  updateParent(id: string, updateParentDTO: UpdateParentDTO) {
    return this.parentModel.findByIdAndUpdate(id, updateParentDTO, {
      new: true,
    });
  }

  // temporary method
  deleteParent(id: string) {
    return this.parentModel.findByIdAndDelete(id);
  }
}
