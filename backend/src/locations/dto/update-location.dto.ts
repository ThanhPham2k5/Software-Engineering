import { IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString({ message: 'Tên trạm phải là chuỗi' })
  LocationName?: string;

  @IsOptional()
  @IsString({ message: 'Tên địa chỉ phải là chuỗi' })
  Address?: string;

  @IsOptional()
  @IsBoolean({ message: 'Tình trạng trạm phải là dạng đúng/sai' })
  Status?: boolean;

  @IsOptional()
  @IsNumber()
  LocationX?: number;

  @IsOptional()
  @IsNumber()
  LocationY?: number;
}
