import { UserCountry } from '../user-country.model';

export type UserCountrySeedData = {
  country: Partial<UserCountry>;
};

export const BuildUserCountrySeedData = async (): Promise<
  UserCountrySeedData[]
> => {
  return [
    {
      country: {
        name: 'Canada',
        isoCode: 'CA',
      },
    },
  ];
};
