import {
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateParentDTO {
  @IsOptional()
  @IsString({ message: 'Tên phụ huynh phải là chuỗi ký tự' })
  @MinLength(3, { message: 'Tên phụ huynh phải có ít nhất 3 ký tự' })
  ParentName?: string;

  @IsOptional()
  @IsIn(['Nam', 'Nữ'], { message: 'Giới tính phải là Nam hoặc Nữ' })
  Gender?: string;

  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  @Length(10, 10, { message: 'Số điện thoại phải có đúng 10 ký tự' })
  Phone?: string;

  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  Address?: string;

  @IsOptional()
  @IsString({ message: 'Mã tài khoản phải là chuỗi' })
  @IsMongoId({ message: 'Mã tài khoản không hợp lệ' })
  AccountID?: string;
}
