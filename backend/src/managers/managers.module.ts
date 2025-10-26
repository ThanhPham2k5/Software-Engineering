import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from 'src/schemas/manager.schema';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { Account, AccountSchema } from 'src/schemas/account.schema';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Manager.name,
        schema: ManagerSchema,
      },
    ]),
    AccountsModule,
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
