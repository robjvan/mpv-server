import { VETS_REPOSITORY } from 'src/utilities/constants';
import { VetModel } from './models/vet.model';

export const vetsProviders = [{ provide: VETS_REPOSITORY, useValue: VetModel }];
