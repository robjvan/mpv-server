import { Module } from '@nestjs/common';
import { VetsService } from './vets.service';
import { VetsController } from './vets.controller';
import { vetsProviders } from './vets.providers';

@Module({
  controllers: [VetsController],
  providers: [VetsService, ...vetsProviders],
})
export class VetsModule {}
