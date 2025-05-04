import { USER_SUBSCRIPTIONS_REPOSITORY } from 'src/utilities/constants';
import { UserSubscription } from './models/user-subscription.model';

export const subscriptionsProviders = [
  {
    provide: USER_SUBSCRIPTIONS_REPOSITORY,
    useValue: UserSubscription,
  },
];
