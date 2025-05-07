import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PetModel } from 'src/modules/pets/models/pet.model';

@Table
export class ActivityModel extends Model<ActivityModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @ForeignKey(() => PetModel)
  @Column(DataType.INTEGER)
  petId?: number;

  @Column({
    type: DataType.ENUM(
      'feeding',
      'walking',
      'exercise',
      'physio',
      'training',
      'play',
      'bathroom',
    ),
  })
  type: string;

  @Column(DataType.INTEGER)
  durationMinutes: number;

  @Column(DataType.TEXT)
  notes: string;

  @Column(DataType.TEXT)
  timestamp: string;

  @Column(DataType.TEXT)
  location: string;

  // public static async seed() {
  //   const seedData: ActivityEntryModelSeedData[] =
  //     await BuildActivityEntryModelSeedData();

  //   const ActivityEntryModels: ActivityModel[] = [];
  //   for (const data of seedData) {
  //     const ActivityEntryModel: ActivityModel = await ActivityEntryModel.create(
  //       data.ActivityEntryModel,
  //     );
  //     ActivityEntryModels.push(ActivityEntryModel);
  //   }
  //   return ActivityEntryModels[0];
  // }
}
