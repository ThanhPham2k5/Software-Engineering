import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SchedulesService } from './schedules.service';
import { Schedule } from 'src/schemas/schedule.schema';
import { ScheduleDetailsService } from '../schedule-details/schedule-details.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let mockScheduleModel: any;
  let mockScheduleDetailsService: any;

  const mockSchedule = {
    _id: '507f1f77bcf86cd799439011',
    ManagerID: '507f1f77bcf86cd799439012',
    DriverID: {
      _id: '507f1f77bcf86cd799439013',
      name: 'Driver Name',
    },
    BusID: {
      _id: '507f1f77bcf86cd799439014',
      licensePlate: 'ABC123',
    },
    RouteID: {
      _id: '507f1f77bcf86cd799439015',
      name: 'Route 1',
    },
    Duration: 60,
    startTime: '08:00',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    Status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createScheduleDto: CreateScheduleDto = {
    ManagerID: '507f1f77bcf86cd799439012',
    DriverID: '507f1f77bcf86cd799439013',
    BusID: '507f1f77bcf86cd799439014',
    RouteID: '507f1f77bcf86cd799439015',
    Duration: 60,
    startTime: '08:00',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    Status: true,
    Students: ['student1', 'student2'],
  };

  const updateScheduleDto: UpdateScheduleDto = {
    Duration: 90,
    startTime: '09:00',
    Students: ['student1', 'student3'],
  };

  beforeEach(async () => {
    // Mock ScheduleModel with constructor support
    const mockSave = jest.fn().mockResolvedValue(mockSchedule);
    
    mockScheduleModel = jest.fn(function(data: any) {
      Object.assign(this, data);
      this.save = mockSave;
    });

    mockScheduleModel.find = jest.fn();
    mockScheduleModel.findById = jest.fn();
    mockScheduleModel.findByIdAndUpdate = jest.fn();
    mockScheduleModel.findByIdAndDelete = jest.fn();

    // Mock ScheduleDetailsService
    mockScheduleDetailsService = {
      createManyScheduleDetails: jest.fn(),
      updateStudentListForSchedule: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: getModelToken(Schedule.name),
          useValue: mockScheduleModel,
        },
        {
          provide: ScheduleDetailsService,
          useValue: mockScheduleDetailsService,
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSchedule', () => {
    it('1.Tạo lịch trình với học sinh', async () => {
      mockScheduleDetailsService.createManyScheduleDetails.mockResolvedValue(
        undefined,
      );

      const result = await service.createSchedule(createScheduleDto);

      expect(result).toEqual(mockSchedule);
      expect(mockScheduleDetailsService.createManyScheduleDetails).toHaveBeenCalledWith(
        mockSchedule._id,
        createScheduleDto.Students,
      );
    });

    it('2.Gọi createManyScheduleDetails khi có học sinh', async () => {
      mockScheduleDetailsService.createManyScheduleDetails.mockResolvedValue(
        undefined,
      );

      await service.createSchedule(createScheduleDto);

      expect(
        mockScheduleDetailsService.createManyScheduleDetails,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockScheduleDetailsService.createManyScheduleDetails,
      ).toHaveBeenCalledWith(
        mockSchedule._id,
        createScheduleDto.Students,
      );
    });

    it('3.Không gọi createManyScheduleDetails khi không có học sinh', async () => {
      const dtoWithoutStudents: CreateScheduleDto = {
        ...createScheduleDto,
        Students: [],
      };

      mockScheduleDetailsService.createManyScheduleDetails.mockResolvedValue(
        undefined,
      );

      await service.createSchedule(dtoWithoutStudents);

      expect(
        mockScheduleDetailsService.createManyScheduleDetails,
      ).not.toHaveBeenCalled();
    });

    it('4.Xử lý lỗi từ ScheduleDetailsService', async () => {
      const error = new Error('Schedule Details Service Error');
      mockScheduleDetailsService.createManyScheduleDetails.mockRejectedValue(
        error,
      );

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await service.createSchedule(createScheduleDto);

      expect(result).toEqual(mockSchedule);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Lỗi từ ScheduleDetailsService:',
        error,
      );

      consoleSpy.mockRestore();
    });

    it('5.Tạo schedule mà không có Students field', async () => {
      const dtoWithoutStudents = {
        ManagerID: '507f1f77bcf86cd799439012',
        DriverID: '507f1f77bcf86cd799439013',
        BusID: '507f1f77bcf86cd799439014',
        RouteID: '507f1f77bcf86cd799439015',
        Duration: 60,
        startTime: '08:00',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        Status: true,
      } as CreateScheduleDto;

      const result = await service.createSchedule(dtoWithoutStudents);

      expect(result).toEqual(mockSchedule);
      expect(
        mockScheduleDetailsService.createManyScheduleDetails,
      ).not.toHaveBeenCalled();
    });
  });

  describe('getSchedules', () => {
    it('6.Lấy tất cả lịch trình với các trường được điền đầy đủ', async () => {
      const mockPopulate = jest.fn().mockResolvedValue([mockSchedule]);
      mockScheduleModel.find.mockReturnValue({
        populate: mockPopulate,
      });

      const result = await service.getSchedules();

      expect(mockScheduleModel.find).toHaveBeenCalled();
      expect(mockPopulate).toHaveBeenCalledWith([
        'DriverID',
        'BusID',
        'RouteID',
      ]);
      expect(result).toEqual([mockSchedule]);
    });

    it('7.Trả về mảng rỗng khi không có lịch trình nào tồn tại', async () => {
      const mockPopulate = jest.fn().mockResolvedValue([]);
      mockScheduleModel.find.mockReturnValue({
        populate: mockPopulate,
      });

      const result = await service.getSchedules();

      expect(mockScheduleModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('8.Populate các trường quan hệ đúng', async () => {
      const mockPopulate = jest.fn().mockResolvedValue([mockSchedule]);
      mockScheduleModel.find.mockReturnValue({
        populate: mockPopulate,
      });

      await service.getSchedules();

      expect(mockPopulate).toHaveBeenCalledWith([
        'DriverID',
        'BusID',
        'RouteID',
      ]);
    });
  });

  describe('getScheduleById', () => {
    it('9.Lấy lịch trình theo id với các trường được điền đầy đủ', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';
      const mockPopulate = jest.fn().mockResolvedValue(mockSchedule);
      mockScheduleModel.findById.mockReturnValue({
        populate: mockPopulate,
      });

      const result = await service.getScheduleById(scheduleId);

      expect(mockScheduleModel.findById).toHaveBeenCalledWith(scheduleId);
      expect(mockPopulate).toHaveBeenCalledWith([
        'DriverID',
        'BusID',
        'RouteID',
      ]);
      expect(result).toEqual(mockSchedule);
    });

    it('10.Trả về null khi không tìm thấy lịch trình', async () => {
      const scheduleId = 'nonexistent-id';
      const mockPopulate = jest.fn().mockResolvedValue(null);
      mockScheduleModel.findById.mockReturnValue({
        populate: mockPopulate,
      });

      const result = await service.getScheduleById(scheduleId);

      expect(mockScheduleModel.findById).toHaveBeenCalledWith(scheduleId);
      expect(result).toBeNull();
    });

    it('11.Gọi findById đúng ID', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';
      const mockPopulate = jest.fn().mockResolvedValue(mockSchedule);
      mockScheduleModel.findById.mockReturnValue({
        populate: mockPopulate,
      });

      await service.getScheduleById(scheduleId);

      expect(mockScheduleModel.findById).toHaveBeenCalledWith(scheduleId);
    });
  });

  describe('updateSchedule', () => {
    it('12.Cập nhật lịch trình với dữ liệu mới', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';
      const updatedSchedule = {
        ...mockSchedule,
        Duration: 90,
        startTime: '09:00',
      };

      mockScheduleModel.findByIdAndUpdate.mockResolvedValue(updatedSchedule);
      mockScheduleDetailsService.updateStudentListForSchedule.mockResolvedValue(
        undefined,
      );

      const result = await service.updateSchedule(scheduleId, updateScheduleDto);

      expect(mockScheduleModel.findByIdAndUpdate).toHaveBeenCalledWith(
        scheduleId,
        expect.objectContaining({
          Duration: 90,
          startTime: '09:00',
        }),
        { new: true },
      );
      expect(
        mockScheduleDetailsService.updateStudentListForSchedule,
      ).toHaveBeenCalledWith(scheduleId, updateScheduleDto.Students);
      expect(result).toEqual(updatedSchedule);
    });

    it('13.Cập nhật lịch trình mà không cập nhật danh sách học sinh khi không có trường Students', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';
      const dtoWithoutStudents: UpdateScheduleDto = {
        Duration: 90,
        startTime: '09:00',
      };

      const updatedSchedule = {
        ...mockSchedule,
        Duration: 90,
        startTime: '09:00',
      };

      mockScheduleModel.findByIdAndUpdate.mockResolvedValue(updatedSchedule);

      const result = await service.updateSchedule(
        scheduleId,
        dtoWithoutStudents,
      );

      expect(mockScheduleModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(
        mockScheduleDetailsService.updateStudentListForSchedule,
      ).not.toHaveBeenCalled();
      expect(result).toEqual(updatedSchedule);
    });

    it('14.Xử lý lỗi khi cập nhật danh sách học sinh', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';
      const updatedSchedule = { ...mockSchedule, Duration: 90 };

      mockScheduleModel.findByIdAndUpdate.mockResolvedValue(updatedSchedule);
      mockScheduleDetailsService.updateStudentListForSchedule.mockRejectedValue(
        new Error('Update Error'),
      );

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await service.updateSchedule(
        scheduleId,
        updateScheduleDto,
      );

      expect(result).toEqual(updatedSchedule);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Lỗi khi cập nhật danh sách học sinh:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    it('15.Trả về null khi không tìm thấy schedule', async () => {
      const scheduleId = 'nonexistent-id';

      mockScheduleModel.findByIdAndUpdate.mockResolvedValue(null);

      const result = await service.updateSchedule(
        scheduleId,
        updateScheduleDto,
      );

      expect(result).toBeNull();
    });

    it('16.Loại bỏ Students khỏi update data trước khi gửi tới Model', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';
      const updatedSchedule = { ...mockSchedule };

      mockScheduleModel.findByIdAndUpdate.mockResolvedValue(updatedSchedule);
      mockScheduleDetailsService.updateStudentListForSchedule.mockResolvedValue(
        undefined,
      );

      await service.updateSchedule(scheduleId, updateScheduleDto);

      // Verify that Students field was not passed to findByIdAndUpdate
      const callArgs = mockScheduleModel.findByIdAndUpdate.mock.calls[0];
      expect(callArgs[1]).not.toHaveProperty('Students');
      expect(callArgs[1]).toHaveProperty('Duration');
      expect(callArgs[1]).toHaveProperty('startTime');
    });
  });

  describe('deleteSchedule', () => {
    it('17.Xóa lịch trình thành công', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';

      mockScheduleModel.findByIdAndDelete.mockResolvedValue(mockSchedule);

      const result = await service.deleteSchedule(scheduleId);

      expect(mockScheduleModel.findByIdAndDelete).toHaveBeenCalledWith(
        scheduleId,
      );
      expect(result).toEqual(mockSchedule);
    });

    it('18.Trả về null khi không tìm thấy lịch trình', async () => {
      const scheduleId = 'nonexistent-id';

      mockScheduleModel.findByIdAndDelete.mockResolvedValue(null);

      const result = await service.deleteSchedule(scheduleId);

      expect(result).toBeNull();
    });

    it('19.Gọi findByIdAndDelete với đúng ID', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';

      mockScheduleModel.findByIdAndDelete.mockResolvedValue(mockSchedule);

      await service.deleteSchedule(scheduleId);

      expect(mockScheduleModel.findByIdAndDelete).toHaveBeenCalledWith(
        scheduleId,
      );
    });

    it('20.Trả về deleted schedule object', async () => {
      const scheduleId = '507f1f77bcf86cd799439011';
      const deletedSchedule = { ...mockSchedule };

      mockScheduleModel.findByIdAndDelete.mockResolvedValue(deletedSchedule);

      const result = await service.deleteSchedule(scheduleId);

      expect(result).toEqual(deletedSchedule);
      if (result) {
        expect(result._id).toBe(mockSchedule._id);
      }
    });
  });
});
