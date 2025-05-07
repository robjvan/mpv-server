import { Controller, Get, Param } from '@nestjs/common';
import { MedicationsService } from './medications.service';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}
  @Get()
  public getAllMedications() {
    return this.medicationsService.getAllMedications();
  }

  @Get('/:id')
  public getMedicationById(@Param('id') id: number) {
    return this.medicationsService.getMedicationById(id);
  }

  @Get('/pet/:id')
  public getAllMedicationsByPetId(@Param('id') id: number) {
    return this.medicationsService.getAllMedicationsByPetId(id);
  }
}
