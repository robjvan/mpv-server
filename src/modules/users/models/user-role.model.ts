import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  UserRoleSeedData,
  BuildUserRoleSeedData,
} from './seeds/user-role.seed';

@Table
export class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  public static async seed() {
    const seedData: UserRoleSeedData[] = await BuildUserRoleSeedData();

    const userRoles: UserRole[] = [];
    for (const data of seedData) {
      const userRole: UserRole = await UserRole.create(data.role);
      userRoles.push(userRole);
    }
    return userRoles[0];
  }
}
