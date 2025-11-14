import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/createAccountDTO';
import { UpdateAccountDto } from './dto/updateAccountDTO';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

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

    // tạo payload
    const payload = {
      sub: account._id.toString(),
      username: account.AccountName,
      role: account.Role,
    };

    // đăng ký token bằng payload
    return { accessToken: this.jwtService.sign(payload) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    if (req.user.role !== 'Quản lý') {
      throw new HttpException('Không có quyền truy cập', HttpStatus.FORBIDDEN);
    }
    return req.user;
  }

  @Get()
  async getAccounts() {
    const getAccounts = await this.accountsService.getAccounts();
    if (!getAccounts)
      throw new HttpException('Lấy danh sách tài khoản không thành công.', 404);
    return getAccounts;
  }

  @UseGuards(JwtAuthGuard)
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
