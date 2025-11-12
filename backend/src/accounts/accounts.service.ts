import { Injectable, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccountDTO';
import { UpdateAccountDto } from './dto/updateAccountDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'src/schemas/account.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    const hashedPassword = await this.hashPassword(createAccountDto.Password);
    const newAccount = new this.accountModel({
      ...createAccountDto,
      Password: hashedPassword,
    });
    return newAccount.save();
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateAccount(
    username: string,
    plainPassword: string,
  ): Promise<any | null> {
    const account = await this.accountModel
      .findOne({ AccountName: username })
      .exec();

    if (!account) return null;

    const validPassword = await this.comparePassword(
      plainPassword,
      account.Password,
    );

    if (!validPassword) return null;
    if (account.Role !== 'Quản lý') return null;

    return account;
  }

  getAccounts() {
    return this.accountModel.find();
  }

  getAccountById(id: string) {
    return this.accountModel.findById(id);
  }

  updateAccount(id: string, updateAccountDto: UpdateAccountDto) {
    return this.accountModel.findByIdAndUpdate(id, updateAccountDto, {
      new: true,
    });
  }

  deleteAccount(id: string) {
    return this.accountModel.findByIdAndDelete(id);
  }
}
