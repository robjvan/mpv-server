import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class VetModel extends Model<VetModel> {
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

  // public static async seed() {
  //   const seedData: VetSeedData[] = await BuildVetSeedData();

  //   const Vets: Vet[] = []
  //   for (const data of seedData) {
  //     const Vet: Vet = await Vet.create(data.Vet);
  //     Vets.push(Vet);
  //   }
  //   return Vets[0];
  //   }
}
