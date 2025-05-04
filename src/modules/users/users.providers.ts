import {
  // USER_LOGINRECORDS_REPOSITORY,
  USER_PLATFORMS_REPOSITORY,
  USER_PROFILES_REPOSITORY,
  USER_SUBSCRIPTIONS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/utilities/constants';
import { UserRole } from './models/user-role.model';
import { User } from './models/user.model';
import { UserProfile } from './models/user-profile.model';
import { UserSubscription } from '../subscriptions/models/user-subscription.model';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
  // {
  //   provide: USER_LOGINRECORDS_REPOSITORY,
  //   useValue: UserLoginRecord,
  // },
  // {
  //   provide: USER_PLATFORMS_REPOSITORY,
  //   useValue: UserPlatform,
  // },
  // {
  //   provide: USER_ROLES_REPOSITORY,
  //   useValue: UserRole,
  // },
  {
    provide: USER_PLATFORMS_REPOSITORY,
    useValue: UserRole,
  },
  {
    provide: USER_PROFILES_REPOSITORY,
    useValue: UserProfile,
  },
  {
    provide: USER_SUBSCRIPTIONS_REPOSITORY,
    useValue: UserSubscription,
  },
];
