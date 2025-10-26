import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString({ message: 'Tên tài khoản phải là chuỗi' })
  AccountName?: string;

  @IsOptional()
  @IsString({ message: 'Mật khẩu tài khoản phải là chuỗi' })
  Password?: string;

  @IsOptional()
  @IsString({ message: 'Vai trò tài khoản phải là chuỗi' })
  @IsIn(['Quản lý', 'Tài xế', 'Phụ huynh'], {
    message: 'Vai trò tài khoản phải là quản lý, tài xế hoặc phụ huynh',
  })
  Role?: string;

  @IsOptional()
  @IsBoolean({ message: 'Tình trạng tài khoản phải là dạng đúng/sai' })
  Status?: boolean;
}
