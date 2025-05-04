import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { VetModel } from './models/vet.model';
import { VETS_REPOSITORY } from 'src/utilities/constants';
import { NewVetDto } from './models/dtos/new-vet.dto';
import { UpdateVetDto } from './models/dtos/update-vet.dto';

@Injectable()
export class VetsService {
  constructor(
    @Inject(VETS_REPOSITORY)
    private readonly vetsRepo: typeof VetModel,
  ) {}

  /** Logger instance scoped to VetsService for tracking and recording service-level operations and errors. */
  private logger: Logger = new Logger(VetsService.name);

  /** Handles common error logging and throwing for service methods. */
  private handleError(error: string, errorMsg: string) {
    this.logger.error(error, errorMsg);
    throw new InternalServerErrorException(error, errorMsg);
  }

  public async getAllVets() {
    try {
      return await this.vetsRepo.findAll();
    } catch (err: any) {
      this.handleError(`Failed to get vet records`, err.message);
    }
  }

  public async getVetById(id: number) {
    try {
      const result = await this.vetsRepo.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (err: any) {
      this.handleError(`Failed to get vet with id ${id}`, err.message);
    }
  }

  public async createNewVet(data: NewVetDto) {
    try {
      return await this.vetsRepo.create(data);
    } catch (err: any) {
      this.handleError(`Failed to create new vet record`, err.message);
    }
  }

  public async updateVetById(id: number, data: UpdateVetDto) {
    try {
      const vetRecord = await this.getVetById(id);

      if (vetRecord) {
        return await vetRecord.update(data);
      }
    } catch (err: any) {
      this.handleError(
        `Failed to update vet record with id ${id}`,
        err.message,
      );
    }
  }

  public async deleteVetById(id: number): Promise<HttpStatus> {
    try {
      const vetRecord = await this.getVetById(id);

      if (!vetRecord) {
        return HttpStatus.NOT_FOUND;
      }

      await vetRecord.destroy();
      return HttpStatus.OK;
    } catch (err: any) {
      this.handleError(`Failed to delete vet record with ${id}`, err.message);
    }
  }
}
