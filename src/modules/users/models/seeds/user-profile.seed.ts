import { UserProfile } from '../user-profile.model';
import { v4 as uuidv4 } from 'uuid';

export type UserProfileSeedData = {
  userProfile: Partial<UserProfile>;
};

export const BuildUserProfileSeedData = async (): Promise<
  UserProfileSeedData[]
> => {
  return [
    {
      userProfile: {
        firstname: 'Rob',
        lastname: 'Vandelinder',
        // locationId: 1,
        phone: '+17092908606',
        userId: 1,
        shippingCode: uuidv4(),
      },
    },
    {
      userProfile: {
        firstname: 'Rob',
        lastname: 'Vandelinder',
        // locationId: 2,
        phone: '+17092908606',
        userId: 2,
        shippingCode: uuidv4(),
      },
    },
  ];
};
