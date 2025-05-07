import { Controller } from '@nestjs/common';
import { ActivityTrackingService } from './activity-tracking.service';

@Controller('activity-tracking')
export class ActivityTrackingController {
  constructor(private readonly activityTrackingService: ActivityTrackingService) {}
}
