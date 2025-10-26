import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty({ message: 'Tiêu đề không được rỗng' })
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  Title: string;

  @IsNotEmpty({ message: 'Nội dung không được rỗng' })
  @IsString({ message: 'Nội dung phải là chuỗi' })
  Body: string;

  @IsNotEmpty({ message: 'Tình trạng không được rỗng' })
  @IsBoolean({ message: 'Tình trạng phải là dạng đúng/sai' })
  Status: boolean;

  @IsNotEmpty({ message: 'Mã tài khoản gửi không được rỗng' })
  @IsMongoId({ message: 'Mã tài khoản gửi phải là mã hợp lệ' })
  AccountFromID: string;

  @IsNotEmpty({ message: 'Mã tài khoản nhận không được rỗng' })
  @IsMongoId({ message: 'Mã tài khoản nhận phải là mã hợp lệ' })
  AccountToID: string;
}
