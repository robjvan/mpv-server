import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  UserPlatformSeedData,
  BuildUserPlatformSeedData,
} from './seeds/user-platform.seed';

@Table
export class UserPlatform extends Model<UserPlatform> {
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

    const userPlatforms: UserPlatform[] = [];
    for (const data of seedData) {
      const userPlatform: UserPlatform = await UserPlatform.create(
        data.platform,
      );
      userPlatforms.push(userPlatform);
    }
    return userPlatforms[0];
  }
}
