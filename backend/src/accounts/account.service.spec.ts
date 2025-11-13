import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Account } from '../schemas/account.schema';

// Giả lập Model và các method của nó
const mockAccountModel = {
  // Mock findOne để nó trả về một đối tượng có thể sử dụng .exec()
  findOne: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
};

// Giả lập thư viện hashing
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('Kiểm tra AccountService:', () => {
  let service: AccountsService;
  let model: Model<Account>;

  beforeEach(async () => {
    // Tạo model mongoose giả
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getModelToken(Account.name),
          useValue: mockAccountModel,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    // Lấy model đã mock để kiểm tra các lệnh gọi database
    model = module.get<Model<Account>>(getModelToken(Account.name));

    jest.clearAllMocks();
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('1. Kiểm tra xác thực tài khoản phải trả về tài khoản', async () => {
    const mockAccountData = {
      _id: 'some_object_id',
      AccountName: 'test_manager',
      Password: 'hashed_password',
      Role: 'Quản lý',
    };

    mockAccountModel.exec.mockResolvedValueOnce(mockAccountData);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.validateAccount(
      'test_manager',
      'plain_password',
    );

    expect(model.findOne).toHaveBeenCalledWith({ AccountName: 'test_manager' });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'plain_password',
      'hashed_password',
    );
    expect(result).toEqual(mockAccountData);
  });

  it('2. Kiểm tra xác thực tài khoản không thành công', async () => {
    const mockAccountData = {
      _id: 'some_object_id',
      AccountName: 'test_manager',
      Password: 'hashed_password',
      Role: 'Quản lý',
    };

    mockAccountModel.exec.mockResolvedValueOnce(mockAccountData);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const result = await service.validateAccount(
      'test_manager',
      'wrong_password',
    );

    expect(result).toBeNull();
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
  });
});
