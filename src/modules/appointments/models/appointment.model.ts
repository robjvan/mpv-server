import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PetModel } from 'src/modules/pets/models/pet.model';

@Table
export class AppointmentModel extends Model<AppointmentModel> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id?: number;

  @ForeignKey(() => PetModel)
  @Column(DataType.INTEGER)
  petId: number;

  @Column(DataType.STRING)
  type: string; // e.g. "Checkup", "Vaccine"

  @Column(DataType.DATE)
  date: Date;

  @Column(DataType.STRING)
  veterinarian?: string;

  @Column(DataType.TEXT)
  notes?: string;

  // public static async seed() {
  //   const seedData: AppointmentModelSeedData[] =
  //     await BuildAppointmentModelSeedData();

  //   const AppointmentModels: AppointmentModel[] = [];
  //   for (const data of seedData) {
  //     const AppointmentModel: AppointmentModel = await AppointmentModel.create(
  //       data.AppointmentModel,
  //     );
  //     AppointmentModels.push(AppointmentModel);
  //   }
  //   return AppointmentModels[0];
  // }
}
