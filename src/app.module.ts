import { Module } from '@nestjs/common';

import { AdminDashboardModule } from './modules/admin-dashboard/admin-dashboard.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CountryModule } from './modules/country/country.module';
import { DatabaseModule } from './modules/database/database.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { MailModule } from './modules/mail/mail.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PetsModule } from './modules/pets/pets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';
import { PhotosModule } from './modules/photos/photos.module';
import { VetsModule } from './modules/vets/vets.module';
import { HealthInsightsModule } from './modules/health-insights/health-insights.module';
import { MedicationsModule } from './modules/medications/medications.module';
import { BehaviourJournalModule } from './modules/behaviour-journal/behaviour-journal.module';
import { ActivityTrackingModule } from './modules/activity-tracking/activity-tracking.module';

@Module({
  imports: [
    AdminDashboardModule,
    AppointmentsModule,
    AuthModule,
    CountryModule,
    DatabaseModule,
    DocumentsModule,
    MailModule,
    PaymentsModule,
    PetsModule,
    ScheduleModule.forRoot(),
    SubscriptionsModule,
    UsersModule,
    PhotosModule,
    VetsModule,
    HealthInsightsModule,
    MedicationsModule,
    BehaviourJournalModule,
    ActivityTrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
