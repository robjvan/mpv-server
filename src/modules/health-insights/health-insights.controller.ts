import { Controller } from '@nestjs/common';
import { HealthInsightsService } from './health-insights.service';

@Controller('health-insights')
export class HealthInsightsController {
  constructor(private readonly healthInsightsService: HealthInsightsService) {}
}
