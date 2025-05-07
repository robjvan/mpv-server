import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  PetBreedModelSeedData,
  BuildPetBreedModelSeedData,
} from './seeds/pet-breed.seed';

@Table
export class PetBreedModel extends Model<PetBreedModel> {
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
    const seedData: PetBreedModelSeedData[] =
      await BuildPetBreedModelSeedData();

    const petBreeds: PetBreedModel[] = [];
    for (const data of seedData) {
      const petBreed: PetBreedModel = await PetBreedModel.create(data.petBreed);
      petBreeds.push(petBreed);
    }
    return petBreeds[0];
  }
}
