import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserSeedData, BuildUserSeedData } from './seeds/user.seed';
import { UserRoleModel } from './user-role.model';

@Table
export class UserModel extends Model<UserModel> {
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
  username: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  smsToken: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  emailToken: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  lastLogin?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  emailConfirmed: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  newsletter: boolean;

  @ForeignKey(() => UserRoleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId: number;

  public static async seed() {
    const seedData: UserSeedData[] = await BuildUserSeedData();

    const Users: UserModel[] = [];
    for (const data of seedData) {
      const user: UserModel = await UserModel.create(data.user);
      Users.push(user);
    }
    return Users[0];
  }
}
