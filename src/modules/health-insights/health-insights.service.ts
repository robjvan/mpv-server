import { Inject, Injectable, Logger } from '@nestjs/common';
import moment from 'moment';
import { ActivityModel } from '../activity-tracking/models/activity.model';
import { AppointmentModel } from '../appointments/models/appointment.model';
import {
  ACTIVITY_REPOSITORY,
  APPOINTMENT_REPOSITORY,
  MEDICATION_REPOSITORY,
} from 'src/utilities/constants';
import { MedicationModel } from '../medications/models/medication.model';

@Injectable()
export class HealthInsightsService {
  private logger = new Logger(HealthInsightsService.name);

  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private activityRepo: typeof ActivityModel,
    @Inject(MEDICATION_REPOSITORY)
    private medicationRepo: typeof MedicationModel,
    @Inject(APPOINTMENT_REPOSITORY)
    private appointmentRepo: typeof AppointmentModel,
  ) {}

  /**
   * Fetch and generate health insights for a given pet ID
   */
  async generateInsights(petId: number): Promise<any[]> {
    const insights = [];

    // ACTIVITY FLAGS
    const activities = await this.activityRepo.findAll({ where: { petId } });
    const recentActivity = activities.filter((act) =>
      moment(act.timestamp).isAfter(moment().subtract(7, 'days')),
    );

    if (recentActivity.length === 0) {
      insights.push({
        insightType: 'activity',
        message: 'No activity recorded in the past 7 days.',
      });
    }

    const playCount = activities.filter((a) => a.type === 'play').length;
    if (playCount < 2) {
      insights.push({
        insightType: 'activity',
        message:
          'Low frequency of playtime recorded. Consider engaging more often.',
      });

      // TODO(RV): Add low walk/run insights?  Integrate weather data for upcoming "nice days"?
    }

    // MEDICATION FLAGS
    const medications = await this.medicationRepo.findAll({ where: { petId } });
    const activeMeds = medications.filter((med) => {
      return !med.endDate || moment(med.endDate).isAfter(moment());
    });

    activeMeds.forEach((med) => {
      const duration = moment().diff(moment(med.startDate), 'days');
      if (duration > 30 && !med.asNeeded) {
        insights.push({
          insightType: 'medication',
          message: `Pet has been on ${med.name} for over 30 days. Consider discussing with vet.`,
        });
      }
    });

    // APPOINTMENT FLAGS
    const appointments = await this.appointmentRepo.findAll({
      where: { petId },
    });
    const futureAppointments = appointments.filter((app) =>
      moment(app.date).isAfter(moment()),
    );
    const pastAppointments = appointments.filter((app) =>
      moment(app.date).isBefore(moment()),
    );

    if (futureAppointments.length === 0) {
      insights.push({
        insightType: 'appointments',
        message:
          'No upcoming appointments found. Consider scheduling a checkup.',
      });
    }

    const lastVisit = pastAppointments.sort((a, b) =>
      moment(b.date).diff(moment(a.date)),
    )[0];
    if (lastVisit && moment().diff(moment(lastVisit.date), 'months') >= 6) {
      insights.push({
        insightType: 'appointments',
        message: 'Last vet visit was over 6 months ago.',
      });
    }

    // // DOCUMENT FLAGS
    // const documents = await this.documentRepo.findAll({ where: { petId } });
    // const weightDocs = documents.filter((d) =>
    //   d.type.toLowerCase().includes('weight'),
    // );
    // if (weightDocs.length >= 2) {
    //   const sorted = weightDocs.sort((a, b) =>
    //     moment(a.date).diff(moment(b.date)),
    //   );
    //   const firstWeight = parseFloat(sorted[0].notes || '0');
    //   const lastWeight = parseFloat(sorted[sorted.length - 1].notes || '0');

    //   if (!isNaN(firstWeight) && !isNaN(lastWeight)) {
    //     const percentChange = ((lastWeight - firstWeight) / firstWeight) * 100;
    //     if (Math.abs(percentChange) > 10) {
    //       insights.push({
    //         insightType: 'documents',
    //         message: `Pet's weight changed by ${percentChange.toFixed(1)}%.`,
    //       });
    //     }
    //   }
    // }

    return insights;
  }
}
