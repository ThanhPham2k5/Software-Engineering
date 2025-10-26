import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateStudentDTO {
  @IsNotEmpty({ message: 'Tên học sinh không được để trống' })
  @IsString({ message: 'Tên học sinh phải là chuỗi ký tự' })
  @MinLength(3, { message: 'Tên học sinh phải có ít nhất 3 ký tự' })
  StudentName: string;

  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsIn(['Nam', 'Nữ'], { message: 'Giới tính phải là Nam hoặc Nữ' })
  Gender: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  Address: string;

  @IsNotEmpty({ message: 'Mã phụ huynh không được để trống' })
  @IsMongoId({ message: 'Mã phụ huynh không hợp lệ' })
  ParentID: string;
}
