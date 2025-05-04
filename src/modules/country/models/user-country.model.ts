import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  CountryModelSeedData,
  BuildCountryModelSeedData,
} from './seeds/user-country.seed';

@Table
export class CountryModel extends Model<CountryModel> {
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
    const seedData: CountryModelSeedData[] = await BuildCountryModelSeedData();

    const Countrys: CountryModel[] = [];
    for (const data of seedData) {
      const country: CountryModel = await CountryModel.create(data.country);
      Countrys.push(country);
    }
    return Countrys[0];
  }
}
