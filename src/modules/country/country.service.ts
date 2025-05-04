import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { countryToAlpha2 } from 'country-to-iso';
import * as lookup from 'country-code-lookup';

import { CountryModel } from './models/user-country.model';
import { COUNTRY_REPOSITORY } from 'src/utilities/constants';
import { AxiosResponse } from 'axios';

@Injectable()
export class CountryService {
  constructor(
    @Inject(COUNTRY_REPOSITORY)
    private readonly countryRepo: typeof CountryModel,
    private readonly httpService: HttpService,
  ) {}
  /** Logger instance scoped to CountryService for tracking and recording service-level operations and errors. */
  private logger: Logger = new Logger(CountryService.name);

  /** Handles common error logging and throwing for service methods. */
  private handleError(error: string, errorMsg: string) {
    this.logger.error(error, errorMsg);
    throw new InternalServerErrorException(error, errorMsg);
  }

  public async getCountryById(id: number): Promise<CountryModel> {
    try {
      const result = await this.countryRepo.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (err: any) {
      this.handleError(
        `Failed to get country record with id ${id}`,
        err.message,
      );
    }
  }

  public async getOrCreateRecord(name: string): Promise<CountryModel> {
    try {
      const result = await this.countryRepo.findOne({ where: { name } });

      if (result) {
        // Return existing record
        return result;
      }

      // Record does not exist, let's create one
      return await this.countryRepo.create({
        name,
        isoCode: countryToAlpha2(name),
      });
    } catch (err: any) {
      this.handleError(``, err.message);
    }
  }

  public async fetchCountryNameByIp(ip: string) {
    this.logger.log(`Fetching country data for ${ip}`);

    try {
      let res: AxiosResponse<any, any>;

      // Fetch country code using IP address
      if (ip == '::1') {
        res = await firstValueFrom(
          // Use hardcoded IP for local testing
          this.httpService.get(`https://api.country.is/174.118.179.69`),
        );
      } else {
        res = await firstValueFrom(
          this.httpService.get(`https://api.country.is/${ip}`),
        );
      }

      const countryCode = res.data.country;

      // Fetch country name using the country code
      const countryRes = lookup.byIso(countryCode);
      if (!countryRes) {
        throw new InternalServerErrorException(
          `Invalid country code: ${countryCode}`,
        );
      }

      return countryRes.country;
    } catch (e: any) {
      throw new InternalServerErrorException(
        `Error fetching country data: ${e.message}`,
      );
    }
  }
}
