import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  PetSpeciesModelSeedData,
  BuildPetSpeciesModelSeedData,
} from './seeds/pet-species.seed';

@Table
export class PetSpeciesModel extends Model<PetSpeciesModel> {
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
    const seedData: PetSpeciesModelSeedData[] =
      await BuildPetSpeciesModelSeedData();

    const petSpeciesModels: PetSpeciesModel[] = [];
    for (const data of seedData) {
      const petSpecies: PetSpeciesModel = await PetSpeciesModel.create(
        data.petSpecies,
      );
      petSpeciesModels.push(petSpecies);
    }
    return petSpeciesModels[0];
  }
}
