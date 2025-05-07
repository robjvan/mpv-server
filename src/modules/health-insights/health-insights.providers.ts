import {
  ACTIVITY_REPOSITORY,
  APPOINTMENT_REPOSITORY,
  MEDICATION_REPOSITORY,
} from 'src/utilities/constants';
import { ActivityModel } from '../activity-tracking/models/activity.model';
import { MedicationModel } from '../medications/models/medication.model';
import { AppointmentModel } from '../appointments/models/appointment.model';

export const healthInsightsProviders = [
  {
    provide: ACTIVITY_REPOSITORY,
    useValue: ActivityModel,
  },
  {
    provide: MEDICATION_REPOSITORY,
    useValue: MedicationModel,
  },
  {
    provide: APPOINTMENT_REPOSITORY,
    useValue: AppointmentModel,
  },
];
