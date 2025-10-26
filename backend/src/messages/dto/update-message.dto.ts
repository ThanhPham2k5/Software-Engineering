import { IsOptional, IsString, IsMongoId, IsBoolean } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  Title?: string;

  @IsOptional()
  @IsString({ message: 'Nội dung phải là chuỗi' })
  Body?: string;

  @IsOptional()
  @IsBoolean({ message: 'Tình trạng phải là dạng đúng/sai' })
  Status?: boolean;

  @IsOptional()
  @IsMongoId({ message: 'Mã tài khoản gửi phải là mã hợp lệ' })
  AccountFromID?: string;

  @IsOptional()
  @IsMongoId({ message: 'Mã tài khoản nhận phải là mã hợp lệ' })
  AccountToID?: string;
}
