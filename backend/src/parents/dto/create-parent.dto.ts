import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateParentDTO {
  @IsNotEmpty({ message: 'Tên phụ huynh không được để trống' })
  @IsString({ message: 'Tên phụ huynh phải là chuỗi ký tự' })
  @MinLength(3, { message: 'Tên phụ huynh phải có ít nhất 3 ký tự' })
  ParentName: string;

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
