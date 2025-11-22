import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleDetailsController } from './schedule-details.controller';
import { ScheduleDetailsService } from './schedule-details.service';
import { StudentsService } from 'src/students/students.service';
import { SchedulesService } from 'src/schedules/schedules.service';
import { HttpException } from '@nestjs/common';
import mongoose from 'mongoose';

// Mock service
const mockScheduleDetailService = {
  createScheduleDetail: jest.fn(),
  getScheduleDetails: jest.fn(),
  getAllScheduleDetailById: jest.fn(),
  getScheduleDetailById: jest.fn(),
  updateScheduleDetail: jest.fn(),
  deleteScheduleDetail: jest.fn(),
};

const mockScheduleService = {
  getScheduleById: jest.fn(),
};

const mockStudentService = {
  getStudentById: jest.fn(),
};

describe('ScheduleDetailsController', () => {
  let controller: ScheduleDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleDetailsController],
      providers: [
        { provide: ScheduleDetailsService, useValue: mockScheduleDetailService },
        { provide: SchedulesService, useValue: mockScheduleService },
        { provide: StudentsService, useValue: mockStudentService },
      ],
    }).compile();

    controller = module.get<ScheduleDetailsController>(
      ScheduleDetailsController,
    );

    jest.clearAllMocks();
  });


  // Tạo chi tiết lịch trình
  //test case 1: Tạo lịch trình thành công
  it('Tạo chi tiết lịch trình thành công', async () => {
    const dto = { ScheduleID: 'sch01', StudentID: 'stu01' };

    mockScheduleService.getScheduleById.mockResolvedValue({ id: 'sch01' });
    mockStudentService.getStudentById.mockResolvedValue({ id: 'stu01' });

    mockScheduleDetailService.createScheduleDetail.mockResolvedValue({
      id: 'detail01',
      ...dto,
    });

    const result = await controller.createScheduleDetail(dto);

    expect(result.id).toBe('detail01');
  });
//test case 2: id lịch trình sai, không tạo được

  it('Không thể tạo chi tiết khi mã lịch trình sai', async () => {
    const dto = { ScheduleID: 'wrong', StudentID: 'stu01' };

    mockScheduleService.getScheduleById.mockResolvedValue(null);

    await expect(controller.createScheduleDetail(dto)).rejects.toThrow(
      HttpException,
    );
  });
//test case 3: id học sinh sai, không tạo được

  it('Không thể tạo chi tiết khi mã học sinh sai', async () => {
    const dto = { ScheduleID: 'sch01', StudentID: 'wrong' };

    mockScheduleService.getScheduleById.mockResolvedValue({ id: 'sch01' });
    mockStudentService.getStudentById.mockResolvedValue(null);

    await expect(controller.createScheduleDetail(dto)).rejects.toThrow(
      HttpException,
    );
  });

//test case 4: Không thể tạo chi tiết khi sv lỗi (đã làm)// nhớ sửa await trong hàm controller

it('Không thể tạo chi tiết khi service tạo lỗi', async () => {
  const dto = { ScheduleID: 'sch01', StudentID: 'stu01' };

  // Giả lập lịch trình và học sinh hợp lệ
  mockScheduleService.getScheduleById.mockResolvedValue({ id: 'sch01' });
  mockStudentService.getStudentById.mockResolvedValue({ id: 'stu01' });

  // Giả lập service trả về Promise<null> (simulate lỗi)
  mockScheduleDetailService.createScheduleDetail.mockResolvedValue(null);

  // Gọi controller với await, kiểm tra ném HttpException
  await expect(controller.createScheduleDetail(dto)).rejects.toThrow(
    'Thêm chi tiết lịch trình không thành công',
  );
});


  // Lấy danh sách chi tiết

  it('Lấy danh sách chi tiết lịch trình thành công', async () => {
    mockScheduleDetailService.getScheduleDetails.mockResolvedValue([
      { id: 'd1' },
      { id: 'd2' },
    ]);

    const result = await controller.getScheduleDetails();

    expect(result.length).toBe(2);
  });

  it('Lấy chi tiết theo ScheduleID thành công', async () => {
    mockScheduleDetailService.getAllScheduleDetailById.mockResolvedValue([
      { id: 'd1', ScheduleID: 'sch01' },
    ]);

    const result = await controller.getScheduleDetails('sch01');

    expect(result[0].ScheduleID).toBe('sch01');
  });


//th lấy ds chi tiết không thành công(đã làm)
it('Không thể tạo chi tiết khi service tạo lỗi', async () => {
  const dto = { ScheduleID: 'sch01', StudentID: 'stu01' };

  // Giả lập lịch trình và học sinh hợp lệ
  mockScheduleService.getScheduleById.mockResolvedValue({ id: 'sch01' });
  mockStudentService.getStudentById.mockResolvedValue({ id: 'stu01' });

  // Giả lập service trả về Promise<null> (simulate lỗi)
  mockScheduleDetailService.createScheduleDetail.mockResolvedValue(null);

  // Gọi controller với await, kiểm tra ném HttpException
  await expect(controller.createScheduleDetail(dto)).rejects.toThrow(
    'Thêm chi tiết lịch trình không thành công',
  );
});


  // Lấy chi tiết theo ID
  //Th lấy thành công
  it('Lấy chi tiết theo ID hợp lệ', async () => {
    const validId = new mongoose.Types.ObjectId().toString();

    mockScheduleDetailService.getScheduleDetailById.mockResolvedValue({
      id: validId,
    });

    const result = await controller.getScheduleDetailById(validId);

    expect(result.id).toBe(validId)
  });
//th lấy chi tiết không thành công

  it('Không thể lấy chi tiết khi ID sai', async () => {
    await expect(
      controller.getScheduleDetailById('invalid-id'),
    ).rejects.toThrow(HttpException);
  });


//th lấy chi tiết không thành công do lỗi sv (đã làm)
it('Không thể lấy chi tiết khi service trả null', async () => {
  const validId = new mongoose.Types.ObjectId().toString();

  // Giả lập service trả về null (simulate lỗi)
  mockScheduleDetailService.getScheduleDetailById.mockResolvedValue(null);

  // Gọi controller và kiểm tra ném HttpException
  await expect(controller.getScheduleDetailById(validId)).rejects.toThrow(
    'Tìm chi tiết lịch trình không thành công.',
  );
});



  // Cập nhật chi tiết
  it('Cập nhật chi tiết thành công', async () => {
    const id = new mongoose.Types.ObjectId().toString();
    const dto = { StudentID: 'stu02' };

    mockStudentService.getStudentById.mockResolvedValue({ id: 'stu02' });
    mockScheduleDetailService.updateScheduleDetail.mockResolvedValue({
      id,
      ...dto,
    });

    const result = await controller.updateScheduleDetail(id, dto);

    expect(result.StudentID).toBe('stu02');
  });

  it('Không thể cập nhật khi StudentID sai', async () => {
    const id = new mongoose.Types.ObjectId().toString();
    const dto = { StudentID: 'wrong' };

    mockStudentService.getStudentById.mockResolvedValue(null);

    await expect(
      controller.updateScheduleDetail(id, dto),
    ).rejects.toThrow(HttpException);
  });
//Th không thể cập nhật khi mã lịch trình sai(đã làm)
it('Không thể cập nhật khi ScheduleID sai', async () => {
  const id = new mongoose.Types.ObjectId().toString();
  const dto = { ScheduleID: 'wrongSchedule' };

  // Giả lập service kiểm tra lịch trình trả null (không tồn tại)
  mockScheduleService.getScheduleById.mockResolvedValue(null);

  await expect(controller.updateScheduleDetail(id, dto)).rejects.toThrow(
    'Mã lịch trình không chính xác.',
  );
});


//th mã chi tiết lịch trình sai(đã làm)
it('Không thể cập nhật khi ID chi tiết lịch trình không hợp lệ', async () => {
  const invalidId = 'invalid-id';
  const dto = { StudentID: 'stu02' };

  await expect(controller.updateScheduleDetail(invalidId, dto)).rejects.toThrow(
    'Không tìm thấy chi tiết lịch trình.',
  );
});


//th không thể cập nhật do lỗi sv(đã làm)
it('Không thể cập nhật chi tiết khi service trả null', async () => {
  const id = new mongoose.Types.ObjectId().toString();
  const dto = { StudentID: 'stu02' };

  // Giả lập Student hợp lệ
  mockStudentService.getStudentById.mockResolvedValue({ id: 'stu02' });

  // Giả lập service update trả null (lỗi)
  mockScheduleDetailService.updateScheduleDetail.mockResolvedValue(null);

  await expect(controller.updateScheduleDetail(id, dto)).rejects.toThrow(
    'Tìm chi tiết lịch trình không thành công.',
  );
});


  // Xóa chi tiết
  //th thành công
  it('Xóa chi tiết thành công', async () => {
    const id = new mongoose.Types.ObjectId().toString();

    mockScheduleDetailService.deleteScheduleDetail.mockResolvedValue({
      id,
      deleted: true,
    });

    const result = await controller.deleteScheduleDetail(id);

    expect(result.deleted).toBe(true);
  });
//th không thành công

  it('Không thể xóa khi ID sai', async () => {
    await expect(
      controller.deleteScheduleDetail('invalid-id'),
    ).rejects.toThrow(HttpException);
  });
// ====================== TEST DELETE SCHEDULE DETAIL - SERVICE LỖI ======================

it('Không thể xóa chi tiết khi service trả null', async () => {
  const id = new mongoose.Types.ObjectId().toString();

  // Giả lập service delete trả null (simulate lỗi)
  mockScheduleDetailService.deleteScheduleDetail.mockResolvedValue(null);

  // Gọi controller và kiểm tra ném HttpException
  await expect(controller.deleteScheduleDetail(id)).rejects.toThrow(
    'Tìm chi tiết lịch trình không thành công.',
  );
});

});
// Th không thành công do sv lỗi(chưa làm)

