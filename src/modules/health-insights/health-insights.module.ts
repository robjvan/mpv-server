import { Module } from '@nestjs/common';
import { HealthInsightsService } from './health-insights.service';
import { HealthInsightsController } from './health-insights.controller';
import { healthInsightsProviders } from './health-insights.providers';

@Module({
  controllers: [HealthInsightsController],
  providers: [HealthInsightsService, ...healthInsightsProviders],
})
export class HealthInsightsModule {}
