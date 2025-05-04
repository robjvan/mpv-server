import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  BuildUserSubscriptionSeedData,
  UserSubscriptionSeedData,
} from './seeds/user-subscriptions.seed';

@Table
export class UserSubscription extends Model<UserSubscription> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tier: number; // 0 - free, 1 - monthly, 2 - annually, 3 - trial

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  lastPaymentDate?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  renewDate?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  cancelDate?: string; // When the sub was cancelled/converted to free

  public static async seed() {
    const seedData: UserSubscriptionSeedData[] =
      await BuildUserSubscriptionSeedData();

    const UserSubscriptions: UserSubscription[] = [];
    for (const data of seedData) {
      const userSubscription: UserSubscription = await UserSubscription.create(
        data.userSubscription,
      );
      UserSubscriptions.push(userSubscription);
    }
    return UserSubscriptions[0];
  }
}
