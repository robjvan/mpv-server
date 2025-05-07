import { MEDICATION_REPOSITORY } from 'src/utilities/constants';
import { MedicationModel } from './models/medication.model';

export const medicationsProviders = [
  {
    provide: MEDICATION_REPOSITORY,
    useValue: MedicationModel,
  },
];
