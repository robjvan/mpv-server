import { COUNTRY_REPOSITORY } from 'src/utilities/constants';
import { CountryModel } from './models/user-country.model';

export const countryProviders = [
  {
    provide: COUNTRY_REPOSITORY,
    useValue: CountryModel,
  },
];
