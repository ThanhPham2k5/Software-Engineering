import { Module } from '@nestjs/common';
import { RouteDetailsService } from './route-details.service';
import { RouteDetailsController } from './route-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteDetail, RouteDetailSchema } from 'src/schemas/routeDetail.schema';
import { LocationsModule } from 'src/locations/locations.module';
import { RoutesModule } from 'src/routes/routes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RouteDetail.name,
        schema: RouteDetailSchema,
      },
    ]),
    LocationsModule,
    RoutesModule,
  ],
  controllers: [RouteDetailsController],
  providers: [RouteDetailsService],
})
export class RouteDetailsModule {}
