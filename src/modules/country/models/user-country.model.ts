import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  UserCountrySeedData,
  BuildUserCountrySeedData,
} from './seeds/user-country.seed';

@Table
export class UserCountry extends Model<UserCountry> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  isoCode?: string;

  public static async seed() {
    const seedData: UserCountrySeedData[] = await BuildUserCountrySeedData();

    const Countrys: UserCountry[] = [];
    for (const data of seedData) {
      const country: UserCountry = await UserCountry.create(data.country);
      Countrys.push(country);
    }
    return Countrys[0];
  }
}
