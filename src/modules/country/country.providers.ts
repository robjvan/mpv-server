import { COUNTRY_REPOSITORY } from 'src/utilities/constants';
import { UserCountry } from './models/user-country.model';

export const countryProviders = [
  {
    provide: COUNTRY_REPOSITORY,
    useValue: UserCountry,
  },
];
