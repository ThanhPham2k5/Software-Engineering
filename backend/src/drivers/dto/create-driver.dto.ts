import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateDriverDTO {
  @IsNotEmpty({ message: 'Tên tài xế không được để trống' })
  @IsString({ message: 'Tên tài xế phải là chuỗi ký tự' })
  @MinLength(3, { message: 'Tên tài xế phải có ít nhất 3 ký tự' })
  DriverName: string;

  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsIn(['Nam', 'Nữ'], { message: 'Giới tính phải là Nam hoặc Nữ' })
  Gender: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  @Length(10, 10, { message: 'Số điện thoại phải có đúng 10 ký tự' })
  Phone: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  Address: string;

  @IsNotEmpty({ message: 'Mã tài khoản không được để trống' })
  @IsMongoId({ message: 'Mã tài khoản không hợp lệ' })
  AccountID: string;
}
