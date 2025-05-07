import { Module } from '@nestjs/common';
import { HealthInsightsService } from './health-insights.service';
import { HealthInsightsController } from './health-insights.controller';

@Module({
  controllers: [HealthInsightsController],
  providers: [HealthInsightsService],
})
export class HealthInsightsModule {}
