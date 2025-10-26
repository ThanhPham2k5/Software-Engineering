import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateScheduleDetailDto {
  @IsNotEmpty({ message: 'Mã lịch trình không được rỗng' })
  @IsMongoId({ message: 'Mã lịch trình phải là mã hợp lệ' })
  ScheduleID: string;

  @IsNotEmpty({ message: 'Mã học sinh không được rỗng' })
  @IsMongoId({ message: 'Mã học sinh phải là mã hợp lệ' })
  StudentID: string;

  @IsNotEmpty({ message: 'Tình trạng không được rỗng' })
  @IsBoolean({ message: 'Tình trạng phải là dạng đúng/sai' })
  Status: boolean;
}
