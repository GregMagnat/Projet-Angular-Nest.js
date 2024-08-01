import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TableModule } from '../tables/table.module';
@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), TableModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
