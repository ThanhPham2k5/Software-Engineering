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
import { ParentsService } from './parents.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateParentDTO } from './dto/create-parent.dto';
import mongoose from 'mongoose';
import { UpdateParentDTO } from './dto/update-parent.dto';

@Controller('parents')
export class ParentsController {
  constructor(
    private parentService: ParentsService,
    private accountService: AccountsService,
  ) {}

  @Post()
  async createParent(@Body() createParentDTO: CreateParentDTO) {
    const accountValid = await this.accountService.getAccountById(
      createParentDTO.AccountID,
    );
    if (!accountValid)
      throw new HttpException('Mã tài khoản không chính xác.', 404);

    const postParent = await this.parentService.createParent(createParentDTO);
    if (!postParent)
      throw new HttpException('Thêm phụ huynh không thành công.', 404);
    return postParent;
  }

  @Get()
  async getParents() {
    const getParents = await this.parentService.getParents();
    if (!getParents)
      throw new HttpException('Lấy danh sách phụ huynh không thành công.', 404);
    return getParents;
  }

  @Get(':id')
  async getParentById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy phụ huynh.', 404);

    const findParent = await this.parentService.getParentById(id);
    if (!findParent)
      throw new HttpException('Tìm phụ huynh không thành công.', 404);
    return findParent;
  }

  @Patch(':id')
  async updateParent(
    @Param('id') id: string,
    @Body() updateParentDTO: UpdateParentDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy phụ huynh.', 400);

    if (updateParentDTO.AccountID) {
      const accountValid = await this.accountService.getAccountById(
        updateParentDTO.AccountID,
      );
      if (!accountValid)
        throw new HttpException('Mã tài khoản không chính xác.', 404);
    }

    const updateParent = await this.parentService.updateParent(
      id,
      updateParentDTO,
    );
    if (!updateParent)
      throw new HttpException('Cập nhật thông tin không thành công.', 404);
    return updateParent;
  }

  // temporary method
  @Delete(':id')
  async deleteParent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy phụ huynh.', 400);

    const deleteParent = this.parentService.deleteParent(id);
    if (!deleteParent)
      throw new HttpException('Xóa dữ liệu không thành công.', 404);
    return deleteParent;
  }
}
