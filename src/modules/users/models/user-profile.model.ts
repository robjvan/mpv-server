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
import { User } from './user.model';
import { UserCountry } from 'src/modules/country/models/user-country.model';

@Table
export class UserProfile extends Model<UserProfile> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @ForeignKey(() => User)
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

  @ForeignKey(() => UserCountry)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  countryId: number;

  public static async seed() {
    const seedData: UserProfileSeedData[] = await BuildUserProfileSeedData();

    const userProfiles: UserProfile[] = [];
    for (const data of seedData) {
      const userProfile: UserProfile = await UserProfile.create(
        data.userProfile,
      );
      userProfiles.push(userProfile);
    }
    return userProfiles[0];
  }
}
