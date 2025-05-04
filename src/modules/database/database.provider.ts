// import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { devConfig, prodConfig, testConfig } from './database.config';
import {
  DEVELOPMENT,
  PRODUCTION,
  SEQUELIZE,
  TEST,
} from 'src/utilities/constants';
import { UserSubscription } from '../subscriptions/models/user-subscription.model';
import { UserPlatform } from '../users/models/user-platform.model';
import { UserProfile } from '../users/models/user-profile.model';
import { UserRole } from '../users/models/user-role.model';
import { User } from '../users/models/user.model';
import { UserCountry } from '../country/models/user-country.model';

dotenv.config();

// Define databaseProviders array containing a provider object
export const databaseProviders = [
  {
    // Provide Sequelize instance as SEQUELIZE token
    provide: SEQUELIZE,
    // Factory function to create and configure Sequelize instance asynchronously
    useFactory: async () => {
      let sequelize;

      switch (process.env.NODE_ENV) {
        case TEST:
          sequelize = testConfig;
          break;
        case PRODUCTION:
          sequelize = prodConfig;
          break;
        case DEVELOPMENT:
        default:
          sequelize = devConfig;
          break;
      }

      // Add database models to the Sequelize instance
      sequelize.addModels([
        //! Add db models here
        // City,
        // Country,
        User,
        // UserLocation,
        // UserLoginRecord,
        UserPlatform,
        UserProfile,
        UserRole,
        UserSubscription,
      ]);

      // sequelize.addModels([__dirname + '/**/*.model.ts']);

      const safeSeed = (
        type: string,
        fn: (...args: any[]) => any,
        ...args: any[]
      ): any => {
        // const logger: Logger = new Logger('S');
        try {
          // logger.log(`Seeding ${type}`);
          return fn(...args);
        } catch (error) {
          console.error(`Error seeding ${type}`, error);
        }
      };

      // Synchronize the database models with the database
      await sequelize.sync({
        force: true, // TODO: NEVER USE 'force: true' in production!!
      });

      const seedDB: boolean = process.env.SEED_DB == 'true';
      if (seedDB) {
        const logger: Logger = new Logger('DatabaseProvider');

        try {
          // Seeding happens here
          // logger.log('SeedDB = ' + seedDB);

          // Seed sample location data
          logger.verbose('Seeding sample location data...');
          // await safeSeed('Regions', Region.seed);
          // await safeSeed('Cities', City.seed);
          await safeSeed('Countries', UserCountry.seed);
          // await safeSeed('UserLocations', UserLocation.seed);

          // Seed sample user data
          logger.verbose('Seeding sample user data...');
          await safeSeed('UserPlatforms', UserPlatform.seed);
          await safeSeed('UserRoles', UserRole.seed);
          await safeSeed('Users', User.seed);
          await safeSeed('UserSubscriptions', UserSubscription.seed);
          await safeSeed('UserProfiles', UserProfile.seed);

          logger.verbose('Seeding done!');
        } catch (err) {
          console.error('Error seeding database', err);
        }
      }

      // Return the configured Sequelize instance
      return sequelize;
    },
  },
];
