import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagersModule } from './managers/managers.module';
import { AccountsModule } from './accounts/accounts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { DriversModule } from './drivers/drivers.module';
import { ParentsModule } from './parents/parents.module';
import { StudentsModule } from './students/students.module';
import { RoutesModule } from './routes/routes.module';
import { BusesModule } from './buses/buses.module';
import { LocationsModule } from './locations/locations.module';
import { RouteDetailsModule } from './route-details/route-details.module';
import { ScheduleDetailsModule } from './schedule-details/schedule-details.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AppService } from './app.service';
import { Account, AccountSchema } from './schemas/account.schema';
import { Manager, ManagerSchema } from './schemas/manager.schema';
import { Driver, DriverSchema } from './schemas/driver.schema';
import { Parent, ParentSchema } from './schemas/parent.schema';
import { Student, StudentSchema } from './schemas/student.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { Route, RouteSchema } from './schemas/route.schema';
import { Bus, BusSchema } from './schemas/bus.schema';
import { RouteDetail, RouteDetailSchema } from './schemas/routeDetail.schema';
import { Location, LocationSchema } from './schemas/location.schema';
import { Schedule, ScheduleSchema } from './schemas/schedule.schema';
import {
  ScheduleDetail,
  ScheduleDetailSchema,
} from './schemas/scheduleDetail.schema';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DBURI!),
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Manager.name, schema: ManagerSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Route.name, schema: RouteSchema },
      { name: Bus.name, schema: BusSchema },
      { name: Location.name, schema: LocationSchema },
      { name: RouteDetail.name, schema: RouteDetailSchema },
      { name: Schedule.name, schema: ScheduleSchema },
      { name: ScheduleDetail.name, schema: ScheduleDetailSchema },
    ]),
    ManagersModule,
    AccountsModule,
    NotificationsModule,
    MessagesModule,
    DriversModule,
    ParentsModule,
    StudentsModule,
    RoutesModule,
    BusesModule,
    LocationsModule,
    RouteDetailsModule,
    ScheduleDetailsModule,
    SchedulesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
