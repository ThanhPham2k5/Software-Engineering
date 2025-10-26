import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBusDto {
  @IsOptional()
  @IsString({ message: 'Giấy phép xe buýt phải là chuỗi' })
  BusLicense?: string;

  @IsOptional()
  @IsInt({ message: 'Sức chứa xe buýt phải là số nguyên' })
  Capacity?: number;

  @IsOptional()
  @IsBoolean({ message: 'Tình trạng xe buýt phải là dạng đúng/sai' })
  Status?: boolean;
}
