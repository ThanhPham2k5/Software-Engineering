import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  ValidationPipe,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/createAccountDTO';
import { UpdateAccountDto } from './dto/updateAccountDTO';
import mongoose from 'mongoose';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    const postAccount = this.accountsService.createAccount(createAccountDto);
    if (!postAccount)
      throw new HttpException('Thêm tài khoản không thành công', 404);
    return postAccount;
  }

  @Post('login')
  async getAccountByBody(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    if (!username || !password) {
      throw new HttpException(
        'Vui lòng cung cấp tên đăng nhập và mật khẩu.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const account = await this.accountsService.validateAccount(
      username,
      password,
    );

    if (!account) {
      throw new HttpException(
        'Tên đăng nhập hoặc mật khẩu không đúng.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { Account_id: account._id.toString() };
  }

  @Get()
  async getAccounts() {
    const getAccounts = await this.accountsService.getAccounts();
    if (!getAccounts)
      throw new HttpException('Lấy danh sách tài khoản không thành công.', 404);
    return getAccounts;
  }

  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tài khoản.', 400);
    const findAccount = await this.accountsService.getAccountById(id);
    if (!findAccount)
      throw new HttpException('Tìm tài khoản không thành công.', 404);
    return findAccount;
  }

  @Patch(':id')
  async updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDTO: UpdateAccountDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tài khoản.', 400);
    const updateAccount = await this.accountsService.updateAccount(
      id,
      updateAccountDTO,
    );
    if (!updateAccount)
      throw new HttpException('Cập nhật tài khoản không thành công.', 404);
    return updateAccount;
  }

  @Delete(':id')
  async deleteAccount(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Không tìm thấy tài khoản.', 400);
    const deleteAccount = this.accountsService.deleteAccount(id);
    if (!deleteAccount)
      throw new HttpException('Xóa dữ liệu không thành công.', 404);
    return deleteAccount;
  }
}
