import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateScheduleDto {
  @IsOptional()
  @IsMongoId({ message: 'Mã quản lý phải là mã hợp lệ' })
  ManagerID?: string;

  @IsOptional()
  @IsMongoId({ message: 'Mã tài xế phải là mã hợp lệ' })
  DriverID?: string;

  @IsOptional()
  @IsMongoId({ message: 'Mã xe buýt phải là mã hợp lệ' })
  BusID?: string;

  @IsOptional()
  @IsMongoId({ message: 'Mã tuyến đường phải là mã hợp lệ' })
  RouteID?: string;

  @IsOptional()
  @IsInt({ message: 'Thời gian phải là số nguyên' })
  Duration?: number;

  @IsNotEmpty()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsBoolean({ message: 'Tình trạng phải là dạng đúng/sai' })
  Status?: boolean;
}
