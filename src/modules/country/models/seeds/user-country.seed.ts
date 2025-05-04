import { CountryModel } from '../user-country.model';

export type CountryModelSeedData = {
  country: Partial<CountryModel>;
};

export const BuildCountryModelSeedData = async (): Promise<
  CountryModelSeedData[]
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
