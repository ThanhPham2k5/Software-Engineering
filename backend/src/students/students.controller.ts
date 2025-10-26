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
import { StudentsService } from './students.service';
import { ParentsService } from 'src/parents/parents.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import mongoose from 'mongoose';
import { UpdateStudentDTO } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(
    private studentService: StudentsService,
    private parentService: ParentsService,
  ) {}

  @Post()
  async createStudent(@Body() createStudentDTO: CreateStudentDTO) {
    const accountValid = await this.parentService.getParentById(
      createStudentDTO.ParentID,
    );
    if (!accountValid)
      throw new HttpException('Mã tài khoản không chính xác.', 404);

    const postStudent =
      await this.studentService.createStudent(createStudentDTO);
    if (!postStudent)
      throw new HttpException('Thêm học sinh không thành công.', 404);
    return postStudent;
  }

  @Get()
  async getStudents() {
    const getStudents = await this.studentService.getStudents();
    if (!getStudents)
      throw new HttpException('Lấy danh sách học sinh không thành công.', 404);
    return getStudents;
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy học sinh.', 404);

    const findStudent = await this.studentService.getStudentById(id);
    if (!findStudent)
      throw new HttpException('Tìm học sinh không thành công.', 404);
    return findStudent;
  }

  @Patch(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDTO: UpdateStudentDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy học sinh.', 400);

    if (updateStudentDTO.ParentID) {
      const accountValid = await this.parentService.getParentById(
        updateStudentDTO.ParentID,
      );
      if (!accountValid)
        throw new HttpException('Mã tài khoản không chính xác.', 404);
    }

    const updateStudent = await this.studentService.updateStudent(
      id,
      updateStudentDTO,
    );
    if (!updateStudent)
      throw new HttpException('Cập nhật thông tin không thành công.', 404);
    return updateStudent;
  }

  // temporary method
  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy học sinh.', 400);

    const deleteStudent = this.studentService.deleteStudent(id);
    if (!deleteStudent)
      throw new HttpException('Xóa dữ liệu không thành công.', 404);
    return deleteStudent;
  }
}
