import { UserSubscriptionModel } from '../user-subscription.model';

export type UserSubscriptionSeedData = {
  userSubscription: Partial<UserSubscriptionModel>;
};

export const BuildUserSubscriptionSeedData = async (): Promise<
  UserSubscriptionSeedData[]
> => {
  return [
    {
      userSubscription: {
        userId: 1,
        tier: 2,
      },
    },
    {
      userSubscription: {
        userId: 2,
        tier: 0,
      },
    },
  ];
};
