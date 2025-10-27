import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'Tên tài khoản không được rỗng' })
  @IsString({ message: 'Tên tài khoản phải là chuỗi' })
  AccountName: string;

  @IsNotEmpty({ message: 'Mật khẩu tài khoản không được rỗng' })
  @IsString({ message: 'Mật khẩu tài khoản phải là chuỗi' })
  Password: string;

  @IsNotEmpty({ message: 'Vai trò tài khoản không được rỗng' })
  @IsString({ message: 'Vai trò tài khoản phải là chuỗi' })
  @IsEnum(['Quản lý', 'Tài xế', 'Phụ huynh'], {
    message: 'Vai trò tài khoản phải là quản lý, tài xế hoặc phụ huynh',
  })
  Role: string;

  @IsNotEmpty({ message: 'Tình trạng tài khoản không được rỗng' })
  @IsBoolean({ message: 'Tình trạng tài khoản phải là dạng đúng/sai' })
  Status: boolean;
}
