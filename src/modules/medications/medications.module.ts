import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { medicationsProviders } from './medication.providers';

@Module({
  controllers: [MedicationsController],
  providers: [MedicationsService, ...medicationsProviders],
})
export class MedicationsModule {}
