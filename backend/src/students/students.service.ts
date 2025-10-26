import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/schemas/student.schema';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async createStudent(createStudentDTO: CreateStudentDTO) {
    const newStudent = new this.studentModel(createStudentDTO);
    return newStudent.save();
  }

  getStudents() {
    return this.studentModel.find();
  }

  getStudentById(id: string) {
    return this.studentModel.findById(id).populate('AccountID');
  }

  updateStudent(id: string, updateStudentDTO: UpdateStudentDTO) {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDTO, {
      new: true,
    });
  }

  // temporary method
  deleteStudent(id: string) {
    return this.studentModel.findByIdAndDelete(id);
  }
}
