import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  USER_PROFILES_REPOSITORY,
  USER_SUBSCRIPTIONS_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/utilities/constants';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import moment from 'moment';

import { User } from './models/user.model';
import { UpdateUserDto } from './models/dtos/update-user.dto';
import { UserProfile } from './models/user-profile.model';
import { UserSubscription } from '../subscriptions/models/user-subscription.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepo: typeof User,
    @Inject(USER_PROFILES_REPOSITORY)
    private readonly userProfilesRepo: typeof UserProfile,
    @Inject(USER_SUBSCRIPTIONS_REPOSITORY)
    private readonly userSubscriptionsRepo: typeof UserSubscription,
  ) {}

  /** Logger instance scoped to UsersService for tracking and recording service-level operations and errors. */
  private logger: Logger = new Logger(UsersService.name);

  /** Handles common error logging and throwing for service methods. */
  private handleError(error: string, errorMsg: string) {
    this.logger.error(error, errorMsg);
    throw new InternalServerErrorException(error, errorMsg);
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersRepo.findAll();
    } catch (err: any) {
      this.handleError(`Failed to get users from db`, err.message);
    }
  }

  public async getUserById(id: number): Promise<User> {
    try {
      const result = await this.usersRepo.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (err: any) {
      this.handleError(`Failed to get user with id ${id}`, err.message);
    }
  }

  public async updateUserById(id: number, data: UpdateUserDto): Promise<User> {
    try {
      const user = await this.getUserById(id);

      return await user.update(data);
    } catch (err: any) {
      this.handleError(`Failed to update user with id ${id}`, err.message);
    }
  }

  public async deactivateUserById(id: number) {
    try {
      // TODO(RV): (Planned) Add data scrambling logic here

      return await this.updateUserById(id, { active: false });
    } catch (err: any) {
      this.handleError(`Failed to deactivate user with id ${id}`, err.message);
    }
  }

  public async createUser(data: any) {
    try {
      // Check if record with given username already exists
      const existingRecord = await this.usersRepo.findOne({
        where: { username: data.username },
      });

      if (existingRecord) {
        throw new InternalServerErrorException(`Username already in use`);
      }

      // Create the user record
      const userRecord = this.usersRepo.build({
        active: true,
        smsToken: Math.floor(100000 + Math.random() * 900000),
        emailToken: uuidv4(),
        emailConfirmed: false,
        newsletter: data.newsletter,
        username: data.username,
        password: await bcrypt.hash(data.password, 10), // TODO(RV): Add logic to hash password
        roleId: 0,
      });

      // Create profile record
      const profileRecord = this.userProfilesRepo.build({
        userId: userRecord.id,
      });

      // Create subscription record
      const now = moment();
      const renewalDate = now.add(7, 'days');

      const subscriptionRecord = this.userSubscriptionsRepo.build({
        userId: userRecord.id,
        tier: 3, // Everyone gets a free trial
        renewDate: renewalDate.format('YYYY-MM-DD'),
      });

      // Ensure all records were created successfully before committing anything to the db
      if (userRecord && profileRecord && subscriptionRecord) {
        // const [userResult, profileResult, subResult] = await Promise.all([
        const [userResult] = await Promise.all([
          await userRecord.save(),
          await profileRecord.save(),
          await subscriptionRecord.save(),
        ]);

        // Return the newly created user record
        return userResult;
      } else {
        throw new InternalServerErrorException(
          'Something went wrong, could not create new user record',
        );
      }
    } catch (err: any) {
      this.handleError(`Failed to create new user`, err.message);
    }
  }
}
