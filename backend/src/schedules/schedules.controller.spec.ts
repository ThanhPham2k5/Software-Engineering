import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { ManagersService } from 'src/managers/managers.service';
import { DriversService } from 'src/drivers/drivers.service';
import { BusesService } from 'src/buses/buses.service';
import { RoutesService } from 'src/routes/routes.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';

// Giả lập SchedulesService
const mockSchedulesService = {
  createSchedule: jest.fn(),
  getSchedules: jest.fn(),
  getScheduleById: jest.fn(),
  updateSchedule: jest.fn(),
  deleteSchedule: jest.fn(),
};

// Giả lập ManagersService
const mockManagersService = {
  getManagerById: jest.fn(),
};

// Giả lập DriversService
const mockDriversService = {
  getDriverById: jest.fn(),
};

// Giả lập BusesService
const mockBusesService = {
  getBusById: jest.fn(),
};

// Giả lập RoutesService
const mockRoutesService = {
  getRouteById: jest.fn(),
};

// Mock data
const mockScheduleId = new mongoose.Types.ObjectId('60c7283c7487f3001f37c355');
const mockManagerId = new mongoose.Types.ObjectId('60c7283c7487f3001f37c356');
const mockDriverId = new mongoose.Types.ObjectId('60c7283c7487f3001f37c357');
const mockBusId = new mongoose.Types.ObjectId('60c7283c7487f3001f37c358');
const mockRouteId = new mongoose.Types.ObjectId('60c7283c7487f3001f37c359');
const mockDuration = new mongoose.Types.ObjectId('60c7283c7487f3001f37c359');

const mockSchedule = {
  _id: mockScheduleId,
  ManagerID: mockManagerId,
  DriverID: mockDriverId,
  BusID: mockBusId,
  RouteID: mockRouteId,
  Duration: 120,
  Status: true,
  startTime: '07:00',
  startDate: '2024-01-15',
  endDate: '2024-01-15',
  Students: [],
};

const createScheduleDto = {
  ManagerID: mockManagerId.toString(),
  DriverID: mockDriverId.toString(),
  BusID: mockBusId.toString(),
  RouteID: mockRouteId.toString(),
  Duration: 120,
  Status: true,
  startTime: '07:00',
  startDate: '2024-01-15',
  endDate: '2024-01-15',
  Students: [],
};

describe('Kiểm tra SchedulesController:', () => {
  let controller: SchedulesController;
  let service: SchedulesService;
  let managerService: ManagersService;
  let driverService: DriversService;
  let busService: BusesService;
  let routeService: RoutesService;

  beforeEach(async () => {
    // Tạo testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        {
          provide: SchedulesService,
          useValue: mockSchedulesService,
        },
        {
          provide: ManagersService,
          useValue: mockManagersService,
        },
        {
          provide: DriversService,
          useValue: mockDriversService,
        },
        {
          provide: BusesService,
          useValue: mockBusesService,
        },
        {
          provide: RoutesService,
          useValue: mockRoutesService,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    service = module.get<SchedulesService>(SchedulesService);
    managerService = module.get<ManagersService>(ManagersService);
    driverService = module.get<DriversService>(DriversService);
    busService = module.get<BusesService>(BusesService);
    routeService = module.get<RoutesService>(RoutesService);

    jest.clearAllMocks();
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSchedule', () => {
    it('1. Tạo lịch trình thành công', async () => {
      // Mock các service trả về dữ liệu hợp lệ
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (busService.getBusById as jest.Mock).mockResolvedValue({
        _id: mockBusId,
      });
      (routeService.getRouteById as jest.Mock).mockResolvedValue({
        _id: mockRouteId,
      });
      (service.createSchedule as jest.Mock).mockResolvedValue(mockSchedule);

      const result = await controller.createSchedule(createScheduleDto);

      expect(managerService.getManagerById).toHaveBeenCalledWith(
        mockManagerId.toString(),
      );
      expect(driverService.getDriverById).toHaveBeenCalledWith(
        mockDriverId.toString(),
      );
      expect(busService.getBusById).toHaveBeenCalledWith(
        mockBusId.toString(),
      );
      expect(routeService.getRouteById).toHaveBeenCalledWith(
        mockRouteId.toString(),
      );
      expect(service.createSchedule).toHaveBeenCalledWith(createScheduleDto);
      expect(result).toEqual(mockSchedule);
    });

    it('2. Tạo lịch trình thất bại - Mã quản lý không chính xác', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.createSchedule(createScheduleDto),
      ).rejects.toThrow(
        new HttpException('Mã quản lý không chính xác.', HttpStatus.NOT_FOUND),
      );

      expect(managerService.getManagerById).toHaveBeenCalledTimes(1);
      expect(service.createSchedule).not.toHaveBeenCalled();
    });

    it('3. Tạo lịch trình thất bại - Mã tài xế không chính xác', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.createSchedule(createScheduleDto),
      ).rejects.toThrow(
        new HttpException('Mã tài xế không chính xác.', HttpStatus.NOT_FOUND),
      );

      expect(driverService.getDriverById).toHaveBeenCalledTimes(1);
      expect(service.createSchedule).not.toHaveBeenCalled();
    });

    it('4. Tạo lịch trình thất bại - Mã xe buýt không chính xác', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (busService.getBusById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.createSchedule(createScheduleDto),
      ).rejects.toThrow(
        new HttpException('Mã xe buýt không chính xác.', HttpStatus.NOT_FOUND),
      );

      expect(busService.getBusById).toHaveBeenCalledTimes(1);
      expect(service.createSchedule).not.toHaveBeenCalled();
    });

    it('5. Tạo lịch trình thất bại - Mã tuyến đường không chính xác', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (busService.getBusById as jest.Mock).mockResolvedValue({
        _id: mockBusId,
      });
      (routeService.getRouteById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.createSchedule(createScheduleDto),
      ).rejects.toThrow(
        new HttpException(
          'Mã tuyến đường không chính xác.',
          HttpStatus.NOT_FOUND,
        ),
      );

      expect(routeService.getRouteById).toHaveBeenCalledTimes(1);
      expect(service.createSchedule).not.toHaveBeenCalled();
    });

    it('6. Tạo lịch trình thất bại - Service trả về null', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (busService.getBusById as jest.Mock).mockResolvedValue({
        _id: mockBusId,
      });
      (routeService.getRouteById as jest.Mock).mockResolvedValue({
        _id: mockRouteId,
      });
      (service.createSchedule as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.createSchedule(createScheduleDto),
      ).rejects.toThrow(
        new HttpException(
          'Thêm lịch trình không thành công',
          HttpStatus.NOT_FOUND,
        ),
      );

      expect(service.createSchedule).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSchedules', () => {
    it('7. Lấy danh sách lịch trình thành công', async () => {
      const mockSchedules = [mockSchedule, { ...mockSchedule, _id: new mongoose.Types.ObjectId() }];
      (service.getSchedules as jest.Mock).mockResolvedValue(mockSchedules);

      const result = await controller.getSchedules();

      expect(service.getSchedules).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSchedules);
      expect(result.length).toBe(2);
    });

    it('8. Lấy danh sách lịch trình thất bại', async () => {
      (service.getSchedules as jest.Mock).mockResolvedValue(null);

      await expect(controller.getSchedules()).rejects.toThrow(
        new HttpException(
          'Lấy danh sách lịch trình không thành công',
          HttpStatus.NOT_FOUND,
        ),
      );

      expect(service.getSchedules).toHaveBeenCalledTimes(1);
    });
  });

  describe('getScheduleById', () => {
    it('9. Lấy lịch trình theo ID thành công', async () => {
      (service.getScheduleById as jest.Mock).mockResolvedValue(mockSchedule);

      const result = await controller.getScheduleById(mockScheduleId.toString());

      expect(service.getScheduleById).toHaveBeenCalledWith(
        mockScheduleId.toString(),
      );
      expect(result).toEqual(mockSchedule);
    });

    it('10. Lấy lịch trình - ID không hợp lệ', async () => {
      const invalidId = 'invalid-id-123';

      await expect(controller.getScheduleById(invalidId)).rejects.toThrow(
        new HttpException(
          'Không tìm thấy lịch trình.',
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(service.getScheduleById).not.toHaveBeenCalled();
    });

    it('11. Lấy lịch trình - Không tìm thấy', async () => {
      (service.getScheduleById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.getScheduleById(mockScheduleId.toString()),
      ).rejects.toThrow(
        new HttpException(
          'Tìm lịch trình không thành công.',
          HttpStatus.NOT_FOUND,
        ),
      );

      expect(service.getScheduleById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateSchedule', () => {
    const updateScheduleDto = {
      ManagerID: mockManagerId.toString(),
      DriverID: mockDriverId.toString(),
      BusID: mockBusId.toString(),
      RouteID: mockRouteId.toString(),
    };

    it('12. Cập nhật lịch trình thành công', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (busService.getBusById as jest.Mock).mockResolvedValue({
        _id: mockBusId,
      });
      (routeService.getRouteById as jest.Mock).mockResolvedValue({
        _id: mockRouteId,
      });
      (service.updateSchedule as jest.Mock).mockResolvedValue(mockSchedule);

      const result = await controller.updateSchedule(
        mockScheduleId.toString(),
        updateScheduleDto,
      );

      expect(service.updateSchedule).toHaveBeenCalledWith(
        mockScheduleId.toString(),
        updateScheduleDto,
      );
      expect(result).toEqual(mockSchedule);
    });

    it('13. Cập nhật lịch trình - ID không hợp lệ', async () => {
      const invalidId = 'invalid-id';

      await expect(
        controller.updateSchedule(invalidId, updateScheduleDto),
      ).rejects.toThrow(
        new HttpException(
          'Không tìm thấy lịch trình.',
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(service.updateSchedule).not.toHaveBeenCalled();
    });

    it('14. Cập nhật lịch trình - Mã quản lý không chính xác', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.updateSchedule(
          mockScheduleId.toString(),
          updateScheduleDto,
        ),
      ).rejects.toThrow(
        new HttpException('Mã quản lý không chính xác.', HttpStatus.NOT_FOUND),
      );

      expect(service.updateSchedule).not.toHaveBeenCalled();
    });

    it('15. Cập nhật lịch trình - Mã tài xế không chính xác', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.updateSchedule(
          mockScheduleId.toString(),
          updateScheduleDto,
        ),
      ).rejects.toThrow(
        new HttpException('Mã tài xế không chính xác.', HttpStatus.NOT_FOUND),
      );

      expect(service.updateSchedule).not.toHaveBeenCalled();
    });

    it('16. Cập nhật lịch trình - Mã xe buýt không chính xác', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (busService.getBusById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.updateSchedule(
          mockScheduleId.toString(),
          updateScheduleDto,
        ),
      ).rejects.toThrow(
        new HttpException('Mã xe buýt không chính xác.', HttpStatus.NOT_FOUND),
      );

      expect(service.updateSchedule).not.toHaveBeenCalled();
    });

    it('17. Cập nhật lịch trình - Mã tuyến đường không chính xác', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (busService.getBusById as jest.Mock).mockResolvedValue({
        _id: mockBusId,
      });
      (routeService.getRouteById as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.updateSchedule(
          mockScheduleId.toString(),
          updateScheduleDto,
        ),
      ).rejects.toThrow(
        new HttpException(
          'Mã tuyến đường không chính xác.',
          HttpStatus.NOT_FOUND,
        ),
      );

      expect(service.updateSchedule).not.toHaveBeenCalled();
    });

    it('18. Cập nhật lịch trình - Service thất bại', async () => {
      (managerService.getManagerById as jest.Mock).mockResolvedValue({
        _id: mockManagerId,
      });
      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (busService.getBusById as jest.Mock).mockResolvedValue({
        _id: mockBusId,
      });
      (routeService.getRouteById as jest.Mock).mockResolvedValue({
        _id: mockRouteId,
      });
      (service.updateSchedule as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.updateSchedule(
          mockScheduleId.toString(),
          updateScheduleDto,
        ),
      ).rejects.toThrow(
        new HttpException(
          'Cập nhật lịch trình không thành công.',
          HttpStatus.NOT_FOUND,
        ),
      );

      expect(service.updateSchedule).toHaveBeenCalledTimes(1);
    });

    it('19. Cập nhật lịch trình - Chỉ cập nhật một số trường', async () => {
      const partialUpdateDto = { DriverID: mockDriverId.toString() };

      (driverService.getDriverById as jest.Mock).mockResolvedValue({
        _id: mockDriverId,
      });
      (service.updateSchedule as jest.Mock).mockResolvedValue({
        ...mockSchedule,
        DriverID: mockDriverId,
      });

      const result = await controller.updateSchedule(
        mockScheduleId.toString(),
        partialUpdateDto,
      );

      expect(result).toBeDefined();
      expect(service.updateSchedule).toHaveBeenCalledWith(
        mockScheduleId.toString(),
        partialUpdateDto,
      );
    });
  });

  describe('deleteSchedule', () => {
    it('20. Xóa lịch trình thành công', async () => {
      (service.deleteSchedule as jest.Mock).mockResolvedValue(mockSchedule);

      const result = await controller.deleteSchedule(mockScheduleId.toString());

      expect(service.deleteSchedule).toHaveBeenCalledWith(
        mockScheduleId.toString(),
      );
      expect(result).toEqual(mockSchedule);
    });

    it('21. Xóa lịch trình - ID không hợp lệ', async () => {
      const invalidId = 'invalid-id';

      await expect(controller.deleteSchedule(invalidId)).rejects.toThrow(
        new HttpException(
          'Không tìm thấy lịch trình.',
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(service.deleteSchedule).not.toHaveBeenCalled();
    });

    it('22. Xóa lịch trình - Service thất bại', async () => {
      (service.deleteSchedule as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.deleteSchedule(mockScheduleId.toString()),
      ).rejects.toThrow(
        new HttpException(
          'Xóa lịch trình không thành công.',
          HttpStatus.NOT_FOUND,
        ),
      );

      expect(service.deleteSchedule).toHaveBeenCalledTimes(1);
    });
  });
});
