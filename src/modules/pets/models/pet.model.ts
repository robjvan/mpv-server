import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ActivityModel } from 'src/modules/activity-tracking/models/activity.model';
import { UserModel } from 'src/modules/users/models/user.model';
import { PetModelSeedData, BuildPetModelSeedData } from './seeds/pets.seed';

@Table
export class PetModel extends Model<PetModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @ForeignKey(() => UserModel)
  @Column
  ownerId: number;

  @BelongsTo(() => UserModel)
  owner: UserModel;

  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.TEXT)
  species?: string;

  @Column(DataType.TEXT)
  breed?: string;

  @Column(DataType.TEXT)
  gender?: string;

  @Column(DataType.TEXT)
  birthdate?: string;

  @Column(DataType.FLOAT)
  weightKg?: number;

  @Column(DataType.TEXT)
  profileImageUrl?: string;

  @HasMany(() => ActivityModel)
  activities: ActivityModel[];

  public static async seed() {
    const seedData: PetModelSeedData[] = await BuildPetModelSeedData();

    const pets: PetModel[] = [];
    for (const data of seedData) {
      const pet: PetModel = await PetModel.create(data.pet);
      pets.push(pet);
    }
    return pets[0];
  }
}
