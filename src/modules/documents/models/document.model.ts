import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PetModel } from 'src/modules/pets/models/pet.model';

@Table
export class DocumentModel extends Model<DocumentModel> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id?: number;

  @ForeignKey(() => PetModel)
  @Column(DataType.INTEGER)
  petId: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  type: string; // e.g. "Weight Record", "Lab Result"

  @Column(DataType.STRING)
  fileUrl: string;

  @Column(DataType.DATE)
  date: Date;

  @Column(DataType.TEXT)
  notes?: string;

  // public static async seed() {
  //   const seedData: DocumentModelSeedData[] =
  //     await BuildDocumentModelSeedData();

  //   const DocumentModels: DocumentModel[] = [];
  //   for (const data of seedData) {
  //     const DocumentModel: DocumentModel = await DocumentModel.create(
  //       data.DocumentModel,
  //     );
  //     DocumentModels.push(DocumentModel);
  //   }
  //   return DocumentModels[0];
  // }
}
