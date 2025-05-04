import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import moment from 'moment';

import { UserSubscription } from './models/user-subscription.model';
import { USER_SUBSCRIPTIONS_REPOSITORY } from 'src/utilities/constants';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject(USER_SUBSCRIPTIONS_REPOSITORY)
    private readonly userSubscriptionsRepo: typeof UserSubscription,
  ) {}
  /** Logger instance scoped to SubscriptionsService for tracking and recording service-level operations and errors. */
  private logger: Logger = new Logger(SubscriptionsService.name);

  /** Handles common error logging and throwing for service methods. */
  private handleError(error: string, errorMsg: string) {
    this.logger.error(error, errorMsg);
    throw new InternalServerErrorException(error, errorMsg);
  }

  // public async createSubscriptionRecord(
  //   userId: number,
  // ): Promise<UserSubscription> {
  //   try {
  //     return await this.userSubscriptionsRepo.create({
  //       userId,
  //       tier: 0,
  //     });
  //   } catch (err: any) {
  //     this.handleError(`Failed to create new subscription record`, err.message);
  //   }
  // }

  public async getSubscriptionById(id: number): Promise<UserSubscription> {
    try {
      const result: UserSubscription = await this.userSubscriptionsRepo.findOne(
        {
          where: { id },
        },
      );

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (err: any) {
      this.handleError(
        `Failed to get subscription record with id ${id}`,
        err.message,
      );
    }
  }

  public async getSubscriptionByUserId(
    userId: number,
  ): Promise<UserSubscription> {
    try {
      const result: UserSubscription = await this.userSubscriptionsRepo.findOne(
        {
          where: { userId },
        },
      );

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (err: any) {
      this.handleError(
        `Failed to get subscription record for user id ${userId}`,
        err.message,
      );
    }
  }

  public async updateSubscriptionTier(
    userId: number,
    newTier: number,
  ): Promise<UserSubscription> {
    try {
      const subRecord: UserSubscription =
        await this.getSubscriptionByUserId(userId);

      const now: moment.Moment = moment();
      let renewDate: string;

      switch (newTier) {
        case 0:
          // Subscription is now free tier, clear the renewal date
          renewDate = null;
          break;
        case 1:
          // Renewal date is one month from today
          renewDate = now.add(1, 'month').format('YYYY-MM-DD');
          break;
        case 2:
          // Renewal date is one year from today
          renewDate = now.add(1, 'year').format('YYYY-MM-DD');
          break;
      }

      return await subRecord.update({
        tier: newTier,
        lastPaymentDate: Date.now().toLocaleString(),
        renewDate,
      });
    } catch (err: any) {
      this.handleError(
        `Failed to update subscription for user id ${userId}`,
        err.message,
      );
    }
  }

  public async updateSubscriptionByUserId(
    userId: number,
    data: Partial<UserSubscription>,
  ) {
    try {
      const subRecord: UserSubscription =
        await this.getSubscriptionByUserId(userId);

      return await subRecord.update(data);
    } catch (err: any) {
      this.handleError(
        `Failed to update subscription record for user id ${userId}`,
        err.message,
      );
    }
  }
}
