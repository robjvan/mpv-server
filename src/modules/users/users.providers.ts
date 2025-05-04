import {
  // USER_LOGINRECORDS_REPOSITORY,
  USER_PLATFORMS_REPOSITORY,
  USER_PROFILES_REPOSITORY,
  USER_SUBSCRIPTIONS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/utilities/constants';
import { UserRoleModel } from './models/user-role.model';
import { UserModel } from './models/user.model';
import { UserProfileModel } from './models/user-profile.model';
import { UserSubscriptionModel } from '../subscriptions/models/user-subscription.model';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: UserModel,
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
    useValue: UserRoleModel,
  },
  {
    provide: USER_PROFILES_REPOSITORY,
    useValue: UserProfileModel,
  },
  {
    provide: USER_SUBSCRIPTIONS_REPOSITORY,
    useValue: UserSubscriptionModel,
  },
];
