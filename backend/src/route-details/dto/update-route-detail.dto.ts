import { IsInt, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateRouteDetailDto {
  @IsOptional()
  @IsMongoId({ message: 'Mã tuyến đường phải là mã hợp lệ' })
  RouteID?: string;

  @IsOptional()
  @IsMongoId({ message: 'Mã trạm bắt đầu phải là mã hợp lệ' })
  LocationStartID: string;

  @IsOptional()
  @IsMongoId({ message: 'Mã trạm kết thúc phải là mã hợp lệ' })
  LocationEndID: string;

  @IsOptional()
  @IsNumber({}, { message: 'Khoảng cách phải là số' })
  Distance: number;

  @IsOptional()
  @IsNumber({}, { message: 'Tốc độ phải là số' })
  Speed: number;

  @IsOptional()
  @IsInt({ message: 'Thứ tự trạm phải là số nguyên' })
  Order: number;
}
