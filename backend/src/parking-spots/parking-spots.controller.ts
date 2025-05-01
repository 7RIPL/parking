import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service';

@Controller('api/parking-spots')
export class ParkingSpotsController {
    constructor(private parkingSpotsService: ParkingSpotsService) {}

    @Get()
    findAll() {
        return this.parkingSpotsService.findAll();
    }

    @Get(':id/available-times')
    getAvailableTimes(@Param('id') id: string, @Query('date') date: string) {
        return this.parkingSpotsService.getAvailableTimes(+id, date);
    }
}