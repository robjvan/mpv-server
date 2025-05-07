import { PetModel } from '../pet.model';

export type PetModelSeedData = {
  pet: Partial<PetModel>;
};

export const BuildPetModelSeedData = async (): Promise<PetModelSeedData[]> => {
  return [
    {
      pet: {
        ownerId: 1,
        name: 'doug',
        species: 'cat',
        gender: 'male',
        birthdate: '2022-03-15',
        weightKg: 7.3,
      },
    },
  ];
};
