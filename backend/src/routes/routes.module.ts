import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from 'src/schemas/route.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Route.name,
        schema: RouteSchema,
      },
    ]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService],
})
export class RoutesModule {}
