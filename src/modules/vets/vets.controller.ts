import { Controller } from '@nestjs/common';
import { VetsService } from './vets.service';

@Controller('vets')
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}
}
