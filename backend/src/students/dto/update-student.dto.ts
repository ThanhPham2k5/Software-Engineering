import {
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateStudentDTO {
  @IsOptional()
  @IsString({ message: 'Tên học sinh phải là chuỗi ký tự' })
  @MinLength(3, { message: 'Tên học sinh phải có ít nhất 3 ký tự' })
  StudentName?: string;

  @IsOptional()
  @IsIn(['Nam', 'Nữ'], { message: 'Giới tính phải là Nam hoặc Nữ' })
  Gender?: string;

  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  Address?: string;

  @IsOptional()
  @IsString({ message: 'Mã phụ huynh phải là chuỗi' })
  @IsMongoId({ message: 'Mã phụ huynh không hợp lệ' })
  ParentID?: string;
}
