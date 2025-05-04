import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  UserProfileSeedData,
  BuildUserProfileSeedData,
} from './seeds/user-profile.seed';
import { UserModel } from './user.model';
import { CountryModel } from 'src/modules/country/models/user-country.model';

@Table
export class UserProfileModel extends Model<UserProfileModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  firstname?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  lastname?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  phone?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  avatarUrl?: string;

  @ForeignKey(() => CountryModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  countryId: number;

  public static async seed() {
    const seedData: UserProfileSeedData[] = await BuildUserProfileSeedData();

    const userProfiles: UserProfileModel[] = [];
    for (const data of seedData) {
      const userProfile: UserProfileModel = await UserProfileModel.create(
        data.userProfile,
      );
      userProfiles.push(userProfile);
    }
    return userProfiles[0];
  }
}
