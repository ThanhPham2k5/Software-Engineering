import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose';
import { Manager } from './schemas/manager.schema';
import { Driver } from './schemas/driver.schema';
import { Parent } from './schemas/parent.schema';
import { Student } from './schemas/student.schema';
import { Notification } from './schemas/notification.schema';
import { Message } from './schemas/message.schema';
import { Route } from './schemas/route.schema';
import { Bus } from './schemas/bus.schema';
import { Location } from './schemas/location.schema';
import { RouteDetail } from './schemas/routeDetail.schema';
import { Schedule } from './schemas/schedule.schema';
import { ScheduleDetail } from './schemas/scheduleDetail.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(Manager.name) private managerModel: Model<Manager>,
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
    @InjectModel(Parent.name) private parentModel: Model<Parent>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Route.name) private routeModel: Model<Route>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(Bus.name) private busModel: Model<Bus>,
    @InjectModel(RouteDetail.name) private routeDetailModel: Model<RouteDetail>,
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
    @InjectModel(ScheduleDetail.name)
    private scheduleDetailModel: Model<ScheduleDetail>,
  ) {}

  async initialize() {
    console.log('Deleting All Database...');
    await Promise.all([
      this.accountModel.deleteMany({}),
      this.managerModel.deleteMany({}),
      this.driverModel.deleteMany({}),
      this.parentModel.deleteMany({}),
      this.studentModel.deleteMany({}),
      this.notificationModel.deleteMany({}),
      this.messageModel.deleteMany({}),
      this.routeModel.deleteMany({}),
      this.locationModel.deleteMany({}),
      this.busModel.deleteMany({}),
      this.routeDetailModel.deleteMany({}),
      this.scheduleModel.deleteMany({}),
      this.scheduleDetailModel.deleteMany({}),
    ]);
    console.log('Delete Completed');

    console.log('Initializing All Database...');
    const accounts = await this.accountModel.insertMany([
      {
        AccountName: 'nva@manager.bus.edu.vn',
        Password: 'manager@123',
        Role: 'Quản lý',
        Status: true,
      },
      {
        AccountName: 'ndt@driver.bus.edu.vn',
        Password: 'driver@123',
        Role: 'Tài xế',
        Status: true,
      },
      {
        AccountName: 'ttl@parent.bus.edu.vn',
        Password: 'parent@123',
        Role: 'Phụ huynh',
        Status: true,
      },
    ]);

    const managers = await this.managerModel.insertMany([
      {
        ManagerName: 'Nguyễn Văn An',
        Gender: 'Nam',
        Phone: '0123456789',
        Address: '27 Tân Bình, Bình Trị Đông, TPHCM',
        AccountID: accounts[0]._id,
      },
    ]);

    const drivers = await this.driverModel.insertMany([
      {
        DriverName: 'Nguyễn Đức Thắng',
        Gender: 'Nam',
        Phone: '0123456789',
        Address: '27 Tân Bình, Bình Trị Đông, TPHCM',
        AccountID: accounts[1]._id,
      },
    ]);

    const parents = await this.parentModel.insertMany([
      {
        ParentName: 'Trần Thị Linh',
        Gender: 'Nữ',
        Phone: '0123456789',
        Address: '27 Tân Bình, Bình Trị Đông, TPHCM',
        AccountID: accounts[2]._id,
      },
    ]);

    const students = await this.studentModel.insertMany([
      {
        StudentName: 'Phạm Phu Quân',
        Gender: 'Nam',
        Address: '27 Tân Bình, Bình Trị Đông, TPHCM',
        ParentID: parents[0]._id,
      },
    ]);

    const notifications = await this.notificationModel.insertMany([
      {
        Title: 'test',
        Body: 'test',
        Status: true,
        AccountID: accounts[0]._id,
      },
    ]);

    const messages = await this.messageModel.insertMany([
      {
        Title: 'test',
        Body: 'test',
        Status: true,
        AccountFromID: accounts[2]._id,
        AccountToID: accounts[0]._id,
      },
    ]);

    const buses = await this.busModel.insertMany([
      {
        BusLicense: '1234-ABCD',
        Capacity: 40,
        Status: true,
      },
    ]);

    const locations = await this.locationModel.insertMany([
      {
        LocationName: 'Đại học Sài Gòn',
        Address: '273 An Dương Vương, Chợ Quán, TPHCM',
        Status: true,
      },
      {
        LocationName: 'Bệnh viện Chợ Rẫy',
        Address: '201B, Nguyễn Chí Thanh, Chợ Lớn, TPHCM',
        Status: true,
      },
    ]);

    const routes = await this.routeModel.insertMany([
      {
        RouteName: 'Đại học Sài Gòn - Bệnh viện Chợ Rẫy',
        Status: true,
      },
    ]);

    const routeDetails = await this.routeDetailModel.insertMany([
      {
        RouteID: routes[0]._id,
        LocationStartID: locations[0]._id,
        LocationEndID: locations[1]._id,
        Distance: 13,
        Speed: 35,
        Order: 1,
      },
    ]);

    const schedules = await this.scheduleModel.insertMany([
      {
        ManagerID: managers[0]._id,
        DriverID: drivers[0]._id,
        BusID: buses[0]._id,
        RouteID: routes[0]._id,
        Duration: 30,
        Status: true,
      },
    ]);

    const scheduleDetails = await this.scheduleDetailModel.insertMany([
      {
        ScheduleID: schedules[0]._id,
        StudentID: students[0]._id,
        Status: true,
      },
    ]);

    console.log('Initialize Completed');
  }
}
