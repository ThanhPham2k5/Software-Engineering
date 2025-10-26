import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Parent, ParentSchema } from 'src/schemas/parent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Parent.name,
        schema: ParentSchema,
      },
    ]),
    AccountsModule,
  ],
  controllers: [ParentsController],
  providers: [ParentsService],
  exports: [ParentsService],
})
export class ParentsModule {}
