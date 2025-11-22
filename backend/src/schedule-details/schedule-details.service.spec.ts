import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleDetailsService } from './schedule-details.service';
import { getModelToken } from '@nestjs/mongoose';

// Tạo mock model Mongoose
const mockScheduleDetailModel = {
  insertMany: jest.fn(),
  deleteMany: jest.fn(),
  find: jest.fn().mockReturnThis(), // cho phép chain .populate()
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  populate: jest.fn().mockReturnThis(),
};


describe('ScheduleDetailsService', () => {
  let service: ScheduleDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleDetailsService,
        {
          provide: getModelToken('ScheduleDetail'),
          useValue: mockScheduleDetailModel,
        },
      ],
    }).compile();

    service = module.get<ScheduleDetailsService>(ScheduleDetailsService);

    jest.clearAllMocks(); // reset các mock trước mỗi test
  });


  // 1) createManyScheduleDetails

  it('Tạo nhiều chi tiết lịch trình thành công', async () => {
    mockScheduleDetailModel.insertMany.mockResolvedValue(true);

    const result = await service.createManyScheduleDetails('sch01', [
      'stu01',
      'stu02',
    ]);

    expect(mockScheduleDetailModel.insertMany).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  // =============================================================
  // 2) updateStudentListForSchedule
  // =============================================================
  it('Cập nhật danh sách học sinh thành công', async () => {
    mockScheduleDetailModel.deleteMany.mockResolvedValue(true);
    mockScheduleDetailModel.insertMany.mockResolvedValue(true);

    const result = await service.updateStudentListForSchedule('sch01', [
      'stu01',
      'stu02',
    ]);

    expect(mockScheduleDetailModel.deleteMany).toHaveBeenCalledWith({
      ScheduleID: 'sch01',
    });
    expect(mockScheduleDetailModel.insertMany).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  // =============================================================
  // 3) createScheduleDetail
  // =============================================================
  it('Tạo 1 chi tiết lịch trình thành công', async () => {
    const dto = { ScheduleID: 'sch01', StudentID: 'stu01' };

    // Tạo 1 mock document có hàm save()
    const mockDoc = {
      save: jest.fn().mockResolvedValue({ id: 'detail01', ...dto }),
    };

    // Thay thế Model bằng jest.fn() trả về mock document
    const MockModel = jest.fn().mockImplementation(() => mockDoc);
    service['ScheduleDetailModel'] = MockModel as any;

    const result = await service.createScheduleDetail(dto);

    expect(MockModel).toHaveBeenCalledWith(dto); // new Model(dto) được gọi
    expect(mockDoc.save).toHaveBeenCalled();     // save() được gọi
    expect(result.id).toBe('detail01');          // kết quả đúng
  });

  // =============================================================
  // 4) getScheduleDetails
  // =============================================================
  it('Lấy danh sách chi tiết thành công', async () => {
    mockScheduleDetailModel.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue([{ id: 'd1' }, { id: 'd2' }]),
    });

    const result = await service.getScheduleDetails();

    expect(result.length).toBe(2);
  });

  // =============================================================
  // 5) getScheduleDetailById
  // =============================================================
  it('Lấy chi tiết theo ID thành công', async () => {
    mockScheduleDetailModel.findById.mockResolvedValue({ id: 'd1' });

    const result = await service.getScheduleDetailById('d1');

    expect(result.id).toBe('d1');
  });

  // =============================================================
  // 6) getAllScheduleDetailById
  // =============================================================
  it('Lấy chi tiết theo ScheduleID thành công', async () => {
    mockScheduleDetailModel.find.mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValue([{ id: 'd1', ScheduleID: 'sch01' }]),
    });

    const result = await service.getAllScheduleDetailById('sch01');

    expect(result[0].ScheduleID).toBe('sch01');
  });

  // =============================================================
  // 7) updateScheduleDetail
  // =============================================================
  it('Cập nhật chi tiết thành công', async () => {
    const oldDoc = { id: 'd1', StudentID: 'stu01' };
    const dto = { StudentID: 'stu02' };

    mockScheduleDetailModel.findByIdAndUpdate.mockResolvedValue({
      ...oldDoc,
      ...dto,
    });

    const result = await service.updateScheduleDetail('d1', dto);

    expect(result.StudentID).toBe('stu02');
    expect(result.StudentID).not.toBe('stu01');
    expect(mockScheduleDetailModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'd1',
      dto,
      { new: true },
    );
  });


  // =============================================================
  // 8) deleteScheduleDetail
  // =============================================================
  it('Xóa chi tiết thành công', async () => {
    mockScheduleDetailModel.findByIdAndDelete.mockResolvedValue({
      id: 'd1',
      deleted: true,
    });

    const result = await service.deleteScheduleDetail('d1');

    expect(result.deleted).toBe(true);
  });
});
