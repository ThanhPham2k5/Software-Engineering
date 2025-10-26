import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty({ message: 'Tên trạm không được rỗng' })
  @IsString({ message: 'Tên trạm phải là chuỗi' })
  LocationName: string;

  @IsNotEmpty({ message: 'Tên địa chỉ không được rỗng' })
  @IsString({ message: 'Tên địa chỉ phải là chuỗi' })
  Address: string;

  @IsNotEmpty({ message: 'Tình trạng trạm không được rỗng' })
  @IsBoolean({ message: 'Tình trạng trạm phải là dạng đúng/sai' })
  Status: boolean;
}
