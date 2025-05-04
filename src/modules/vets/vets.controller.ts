import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VetsService } from './vets.service';

@Controller('vets')
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}

  @Get()
  public getAllVets() {
    return this.vetsService.getAllVets();
  }

  @Get('/:id')
  public getVetById(@Param('id') id: number) {
    return this.vetsService.getVetById(id);
  }

  @Post()
  public createNewVet(@Body() data: any) {
    return this.vetsService.createNewVet(data);
  }

  @Patch('/:id')
  public updateVetById(@Param('id') id: number, @Body() data: any) {
    return this.vetsService.updateVetById(id, data);
  }

  @Delete('/:id')
  public deleteVetById(@Param('id') id: number) {
    return this.vetsService.deleteVetById(id);
  }
}
