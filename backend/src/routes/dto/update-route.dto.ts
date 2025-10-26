import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRouteDto {
  @IsOptional()
  @IsString({ message: 'Tên tuyến đường phải là chuỗi' })
  RouteName?: string;

  @IsOptional()
  @IsBoolean({ message: 'Tình trạng tuyến đường phải là dạng đúng/sai' })
  Status?: boolean;
}
