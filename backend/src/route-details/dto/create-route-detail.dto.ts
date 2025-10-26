import { IsInt, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRouteDetailDto {
  @IsNotEmpty({ message: 'Mã tuyến đường không được rỗng' })
  @IsMongoId({ message: 'Mã tuyến đường phải là mã hợp lệ' })
  RouteID: string;

  @IsNotEmpty({ message: 'Mã trạm bắt đầu không được rỗng' })
  @IsMongoId({ message: 'Mã trạm bắt đầu phải là mã hợp lệ' })
  LocationStartID: string;

  @IsNotEmpty({ message: 'Mã trạm kết thúc không được rỗng' })
  @IsMongoId({ message: 'Mã trạm kết thúc phải là mã hợp lệ' })
  LocationEndID: string;

  @IsNotEmpty({ message: 'Khoảng cách không được rỗng' })
  @IsNumber({}, { message: 'Khoảng cách phải là số' })
  Distance: number;

  @IsNotEmpty({ message: 'Tốc độ không được rỗng' })
  @IsNumber({}, { message: 'Tốc độ phải là số' })
  Speed: number;

  @IsNotEmpty({ message: 'Thứ tự trạm không được rỗng' })
  @IsInt({ message: 'Thứ tự trạm phải là số nguyên' })
  Order: number;
}
