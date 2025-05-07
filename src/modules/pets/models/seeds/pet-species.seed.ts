import { PetSpeciesModel } from '../pet-species.model';

export type PetSpeciesModelSeedData = {
  petSpecies: Partial<PetSpeciesModel>;
};

export const BuildPetSpeciesModelSeedData = async (): Promise<
  PetSpeciesModelSeedData[]
> => {
  return [
    {
      petSpecies: {
        name: 'cat',
      },
    },
    {
      petSpecies: {
        name: 'dog',
      },
    },
    {
      petSpecies: {
        name: 'budgie',
      },
    },
  ];
};
