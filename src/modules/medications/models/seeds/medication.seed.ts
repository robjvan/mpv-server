import { MedicationModel } from '../medication.model';

export type MedicationSeedData = {
  medication: Partial<MedicationModel>;
};

export const BuildMedicationSeedData = async (): Promise<
  MedicationSeedData[]
> => {
  return [
    // {
    //   medication: {
    //     name: 'calico',
    //   },
    // },
  ];
};
