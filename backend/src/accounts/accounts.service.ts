import { Injectable, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccountDTO';
import { UpdateAccountDto } from './dto/updateAccountDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'src/schemas/account.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  createAccount(createAccountDto: CreateAccountDto) {
    const newAccount = new this.accountModel(createAccountDto);
    return newAccount.save();
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
