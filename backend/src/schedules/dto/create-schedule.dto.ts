import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty({ message: 'Mã quản lý không được rỗng' })
  @IsMongoId({ message: 'Mã quản lý phải là mã hợp lệ' })
  ManagerID: string;

  @IsNotEmpty({ message: 'Mã tài xế không được rỗng' })
  @IsMongoId({ message: 'Mã tài xế phải là mã hợp lệ' })
  DriverID: string;

  @IsNotEmpty({ message: 'Mã xe buýt không được rỗng' })
  @IsMongoId({ message: 'Mã xe buýt phải là mã hợp lệ' })
  BusID: string;

  @IsNotEmpty({ message: 'Mã tuyến đường không được rỗng' })
  @IsMongoId({ message: 'Mã tuyến đường phải là mã hợp lệ' })
  RouteID: string;

  @IsNotEmpty({ message: 'Thời gian không được rỗng' })
  @IsInt({ message: 'Thời gian phải là số nguyên' })
  Duration: number;

  @IsNotEmpty({ message: 'Tình trạng không được rỗng' })
  @IsBoolean({ message: 'Tình trạng phải là dạng đúng/sai' })
  Status: boolean;
}
