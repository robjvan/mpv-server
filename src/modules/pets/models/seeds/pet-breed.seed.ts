import { PetBreedModel } from '../pet-breed.model';

export type PetBreedModelSeedData = {
  petBreed: Partial<PetBreedModel>;
};

export const BuildPetBreedModelSeedData = async (): Promise<
  PetBreedModelSeedData[]
> => {
  return [
    {
      petBreed: {
        name: 'calico',
      },
    },
    {
      petBreed: {
        name: 'daschund',
      },
    },
    {
      petBreed: {
        name: 'blue',
      },
    },
  ];
};
