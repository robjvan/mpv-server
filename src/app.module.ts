import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { PetsModule } from './modules/pets/pets.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { MailModule } from './modules/mail/mail.module';
import { LocationsModule } from './modules/locations/locations.module';
import { AdminDashboardModule } from './modules/admin-dashboard/admin-dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.forRoot(),
    UsersModule,
    AppointmentsModule,
    PetsModule,
    PaymentsModule,
    SubscriptionsModule,
    MailModule,
    LocationsModule,
    AdminDashboardModule,
    AuthModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
