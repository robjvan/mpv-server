import { ActivityModel } from '../activity.model';

export type ActivityModelSeedData = {
  activityModel: Partial<ActivityModel>;
};

export const BuildActivityModelSeedData = async (): Promise<
  ActivityModelSeedData[]
> => {
  return [
    // {
    //   activityModel: {
    //     type: 1,
    //     lastname: 'Vandelinder',
    //     phone: '+17092908606',
    //     userId: 1,
    //     countryId: 1,
    //   },
    // },
  ];
};
