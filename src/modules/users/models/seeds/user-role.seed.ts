import { UserRoleModel } from '../user-role.model';

export type UserRoleSeedData = {
  role: Partial<UserRoleModel>;
};

export const BuildUserRoleSeedData = async (): Promise<UserRoleSeedData[]> => {
  return [
    {
      role: {
        name: 'user',
      },
    },
    {
      role: {
        name: 'tester',
      },
    },
    {
      role: {
        name: 'admin',
      },
    },
  ];
};
