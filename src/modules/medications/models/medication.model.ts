import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  MedicationSeedData,
  BuildMedicationSeedData,
} from './seeds/medication.seed';

@Table
export class MedicationModel extends Model<MedicationModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  petId: number;

  // Name of the medication (e.g., “Metacam”)
  @Column(DataType.TEXT)
  name: string;

  // Human-readable dosage (e.g., “2.5 ml”, “1 tablet”)
  @Column(DataType.TEXT)
  dose: string;

  // How the medication is given
  @Column(
    DataType.ENUM(
      'oral',
      'topical',
      'injectable',
      'ophthalmic',
      'otic',
      'other',
    ),
  )
  route: string;

  // Text like "every 12 hours", "once a day", etc.
  @Column(DataType.TEXT)
  frequency: string;

  @Column(DataType.DATE)
  startDate: Date;

  // Optional end date for short courses
  @Column({ type: DataType.DATE, allowNull: true })
  endDate?: Date;

  // Name of the vet who prescribed it
  @Column({ type: DataType.TEXT, allowNull: true })
  prescribedBy?: string;

  // What condition or issue it's treating
  @Column({ type: DataType.TEXT, allowNull: true })
  reason?: string;

  // Any extra instructions or observations
  @Column({ type: DataType.TEXT, allowNull: true })
  notes?: string;

  // Optional photo of bottle/package/prescription
  @Column({ type: DataType.TEXT, allowNull: true })
  imageUrl?: string;

  @Column(DataType.BOOLEAN)
  reminderEnabled: boolean;

  // Default time of day for the reminder
  @Column({ type: DataType.TEXT, allowNull: true })
  reminderTime?: string;

  // When the refill is expected or needed
  @Column({ type: DataType.DATE, allowNull: true })
  refillDate?: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  refillReminder?: boolean;

  // Most recent administration timestamp
  @Column({ type: DataType.DATE, allowNull: true })
  lastGivenAt?: Date;

  // Calculated next dose time (optional, auto-updated)
  @Column({ type: DataType.DATE, allowNull: true })
  nextDoseAt?: Date;

  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @Column(DataType.BOOLEAN)
  asNeeded?: boolean;

  public static async seed() {
    const seedData: MedicationSeedData[] = await BuildMedicationSeedData();

    const medications: MedicationModel[] = [];
    for (const data of seedData) {
      const medication: MedicationModel = await MedicationModel.create(
        data.medication,
      );
      medications.push(medication);
    }
    return medications[0];
  }
}
