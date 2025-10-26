import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBusDto {
  @IsNotEmpty({ message: 'Giấy phép xe buýt không được rỗng' })
  @IsString({ message: 'Giấy phép xe buýt phải là chuỗi' })
  BusLicense: string;

  @IsNotEmpty({ message: 'Sức chứa xe buýt không được rỗng' })
  @IsInt({ message: 'Sức chứa xe buýt phải là số nguyên' })
  Capacity: number;

  @IsNotEmpty({ message: 'Tình trạng xe buýt không được rỗng' })
  @IsBoolean({ message: 'Tình trạng xe buýt phải là dạng đúng/sai' })
  Status: boolean;
}
