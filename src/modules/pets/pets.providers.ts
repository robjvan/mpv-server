import {
  PETS_BREEDS_REPOSITORY,
  PETS_REPOSITORY,
  PETS_SPECIES_REPOSITORY,
} from 'src/utilities/constants';
import { PetModel } from './models/pet.model';
import { PetBreedModel } from './models/pet-breed.model';
import { PetSpeciesModel } from './models/pet-species.model';

export const petsProviders = [
  { provide: PETS_REPOSITORY, useValue: PetModel },
  { provide: PETS_BREEDS_REPOSITORY, useValue: PetBreedModel },
  { provide: PETS_SPECIES_REPOSITORY, useValue: PetSpeciesModel },
];
