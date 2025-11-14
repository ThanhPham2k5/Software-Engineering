import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';

// Giả lập AccountService
const mockAccountsService = {
  validateAccount: jest.fn(),
  createAccount: jest.fn(),
  getAccounts: jest.fn(),
  getAccountById: jest.fn(),
  updateAccount: jest.fn(),
  deleteAccount: jest.fn(),
};

// Giả lập hàm sign luôn trả về một token giả
const mockJwtService = {
  sign: jest.fn(() => 'mocked.jwt.token'),
};

describe('Kiểm tra AccountController:', () => {
  let controller: AccountsController;
  let service: AccountsService;
  let jwtService: JwtService;

  beforeEach(async () => {
    // Tạo model service giả
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        {
          provide: AccountsService,
          useValue: mockAccountsService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    service = module.get<AccountsService>(AccountsService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('1. Đăng nhập thành công', async () => {
    const mockAccount = {
      _id: new mongoose.Types.ObjectId('60c7283c7487f3001f37c355'),
      AccountName: 'manager_user',
      Role: 'Quản lý',
    };

    // verify mock variables
    (service.validateAccount as jest.Mock).mockResolvedValue(mockAccount);
    (jwtService.sign as jest.Mock).mockReturnValue('mocked.jwt.token');

    const result = await controller.getAccountByBody(
      'manager_user',
      'manager_pass',
    );

    expect(service.validateAccount).toHaveBeenCalledWith(
      'manager_user',
      'manager_pass',
    );
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: mockAccount._id,
      username: mockAccount.AccountName,
      role: mockAccount.Role,
    });
    expect(result).toEqual({ accessToken: 'mocked.jwt.token' });
  });

  it('2. Đăng nhập thất bại', async () => {
    (service.validateAccount as jest.Mock).mockResolvedValue(null);

    await expect(
      controller.getAccountByBody('wrong_user', 'wrong_pass'),
    ).rejects.toThrow(
      new HttpException(
        'Tên đăng nhập hoặc mật khẩu không đúng.',
        HttpStatus.UNAUTHORIZED,
      ),
    );

    expect(service.validateAccount).toHaveBeenCalledTimes(1);
  });

  it('3. Đăng nhập thiếu thông tin', async () => {
    await expect(
      controller.getAccountByBody('user', undefined as any),
    ).rejects.toThrow(
      new HttpException(
        'Vui lòng cung cấp tên đăng nhập và mật khẩu.',
        HttpStatus.BAD_REQUEST,
      ),
    );

    expect(service.validateAccount).not.toHaveBeenCalled();
  });
});
