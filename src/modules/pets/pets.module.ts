import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { petsProviders } from './pets.providers';

@Module({
  controllers: [PetsController],
  providers: [PetsService, ...petsProviders],
})
export class PetsModule {}
