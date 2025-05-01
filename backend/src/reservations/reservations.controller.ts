import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('api/reservations')
export class ReservationsController {
    constructor(private reservationsService: ReservationsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createReservationDto: CreateReservationDto) {
        return this.reservationsService.create(req.user.id, createReservationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findByUser(@Request() req) {
        return this.reservationsService.findByUser(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    cancel(@Param('id') id: string) {
        return this.reservationsService.cancel(+id);
    }
}