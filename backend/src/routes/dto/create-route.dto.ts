import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty({ message: 'Tên tuyến đường không được rỗng' })
  @IsString({ message: 'Tên tuyến đường phải là chuỗi' })
  RouteName: string;

  @IsNotEmpty({ message: 'Tình trạng tuyến đường không được rỗng' })
  @IsBoolean({ message: 'Tình trạng tuyến đường phải là dạng đúng/sai' })
  Status: boolean;
}
