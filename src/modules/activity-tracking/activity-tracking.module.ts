import { Module } from '@nestjs/common';
import { ActivityTrackingService } from './activity-tracking.service';
import { ActivityTrackingController } from './activity-tracking.controller';

@Module({
  controllers: [ActivityTrackingController],
  providers: [ActivityTrackingService],
})
export class ActivityTrackingModule {}
