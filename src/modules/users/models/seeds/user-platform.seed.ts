import { UserPlatform } from '../user-platform.model';

export type UserPlatformSeedData = {
  platform: Partial<UserPlatform>;
};

export const BuildUserPlatformSeedData = async (): Promise<
  UserPlatformSeedData[]
> => {
  return [
    // Add admin user
    {
      platform: {
        name: 'web',
      },
    },
    {
      platform: {
        name: 'ios',
      },
    },
    {
      platform: {
        name: 'android',
      },
    },
    {
      platform: {
        name: 'windows',
      },
    },
    {
      platform: {
        name: 'macos',
      },
    },
    {
      platform: {
        name: 'linux',
      },
    },
    {
      platform: {
        name: 'unknown',
      },
    },
  ];
};
