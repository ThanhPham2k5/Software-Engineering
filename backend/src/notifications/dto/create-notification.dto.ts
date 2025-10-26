import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty({ message: 'Tiêu đề không được rỗng' })
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  Title: string;

  @IsNotEmpty({ message: 'Nội dung không được rỗng' })
  @IsString({ message: 'Nội dung phải là chuỗi' })
  Body: string;

  @IsNotEmpty({ message: 'Tình trạng không được rỗng' })
  @IsBoolean({ message: 'Tình trạng phải là dạng đúng/sai' })
  Status: boolean;

  @IsNotEmpty({ message: 'Mã tài khoản không được rỗng' })
  @IsMongoId({ message: 'Mã tài khoản phải là mã hợp lệ' })
  AccountID: string;
}
