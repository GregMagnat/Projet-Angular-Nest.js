import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './create-reservation.dto';
import { UpdateReservationDto } from './update-reservation.dto'; 


@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  @Get(':id')
  getReservationById(@Param('id') id: number) {
    return this.reservationService.getReservationById(id);
  }

  @Post()
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Put(':id')
  updateReservation(@Param('id') id: number, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.updateReservation(id, updateReservationDto);
  }

  @Delete(':id')
  deleteReservation(@Param('id') id: number) {
    return this.reservationService.deleteReservation(id);
  }
}
