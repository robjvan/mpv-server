import { UserProfileModel } from '../user-profile.model';

export type UserProfileSeedData = {
  userProfile: Partial<UserProfileModel>;
};

export const BuildUserProfileSeedData = async (): Promise<
  UserProfileSeedData[]
> => {
  return [
    {
      userProfile: {
        firstname: 'Rob',
        lastname: 'Vandelinder',
        phone: '+17092908606',
        userId: 1,
        countryId: 1,
      },
    },
    {
      userProfile: {
        firstname: 'Rob',
        lastname: 'Vandelinder',
        phone: '+17092908606',
        userId: 2,
        countryId: 1,
      },
    },
  ];
};
