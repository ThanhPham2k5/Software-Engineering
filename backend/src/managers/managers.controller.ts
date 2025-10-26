import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDTO } from './dto/createManagerDTO';
import mongoose from 'mongoose';
import { UpdateManagerDTO } from './dto/updateManagerDTO';
import { AccountsService } from 'src/accounts/accounts.service';

@Controller('managers')
export class ManagersController {
  constructor(
    private managerService: ManagersService,
    private accountService: AccountsService,
  ) {}

  @Post()
  async createManager(@Body() createManagerDTO: CreateManagerDTO) {
    const accountValid = await this.accountService.getAccountById(
      createManagerDTO.AccountID,
    );
    if (!accountValid)
      throw new HttpException('Mã tài khoản không chính xác.', 404);

    const postManager =
      await this.managerService.createManager(createManagerDTO);
    if (!postManager)
      throw new HttpException('Thêm quản lý không thành công.', 404);
    return postManager;
  }

  @Get()
  async getManagers() {
    const getManagers = await this.managerService.getManagers();
    if (!getManagers)
      throw new HttpException('Lấy danh sách quản lý không thành công.', 404);
    return getManagers;
  }

  @Get(':id')
  async getManagerById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy quản lý.', 404);

    const findManager = await this.managerService.getManagerById(id);
    if (!findManager)
      throw new HttpException('Tìm quản lý không thành công.', 404);
    return findManager;
  }

  @Patch(':id')
  async updateManager(
    @Param('id') id: string,
    @Body() updateManagerDTO: UpdateManagerDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy quản lý.', 400);

    if (updateManagerDTO.AccountID) {
      const accountValid = await this.accountService.getAccountById(
        updateManagerDTO.AccountID,
      );
      if (!accountValid)
        throw new HttpException('Mã tài khoản không chính xác.', 404);
    }

    const updateManager = await this.managerService.updateManager(
      id,
      updateManagerDTO,
    );
    if (!updateManager)
      throw new HttpException('Cập nhật thông tin không thành công.', 404);
    return updateManager;
  }

  // temporary method
  @Delete(':id')
  async deleteManager(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy quản lý.', 400);

    const deleteManager = this.managerService.deleteManager(id);
    if (!deleteManager)
      throw new HttpException('Xóa dữ liệu không thành công.', 404);
    return deleteManager;
  }
}
