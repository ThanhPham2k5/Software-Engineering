import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from 'src/schemas/driver.schema';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriverSchema,
      },
    ]),
    AccountsModule,
  ],
  controllers: [DriversController],
  providers: [DriversService],
  exports: [DriversService],
})
export class DriversModule {}
