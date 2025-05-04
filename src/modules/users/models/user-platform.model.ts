import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  UserPlatformSeedData,
  BuildUserPlatformSeedData,
} from './seeds/user-platform.seed';

@Table
export class UserPlatformModel extends Model<UserPlatformModel> {
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
    const seedData: UserPlatformSeedData[] = await BuildUserPlatformSeedData();

    const userPlatforms: UserPlatformModel[] = [];
    for (const data of seedData) {
      const userPlatform: UserPlatformModel = await UserPlatformModel.create(
        data.platform,
      );
      userPlatforms.push(userPlatform);
    }
    return userPlatforms[0];
  }
}
