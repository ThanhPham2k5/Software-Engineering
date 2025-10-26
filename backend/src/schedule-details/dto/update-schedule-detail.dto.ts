import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';

export class UpdateScheduleDetailDto {
  @IsOptional()
  @IsMongoId({ message: 'Mã lịch trình phải là mã hợp lệ' })
  ScheduleID: string;

  @IsOptional()
  @IsMongoId({ message: 'Mã học sinh phải là mã hợp lệ' })
  StudentID: string;

  @IsOptional()
  @IsBoolean({ message: 'Tình trạng phải là dạng đúng/sai' })
  Status: boolean;
}
