import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MEDICATION_REPOSITORY } from 'src/utilities/constants';
import { MedicationModel } from './models/medication.model';

@Injectable()
export class MedicationsService {
  constructor(
    @Inject(MEDICATION_REPOSITORY)
    private readonly medicationsRepo: typeof MedicationModel,
  ) {}

  /** Logger instance scoped to MedicationsService for tracking and recording service-level operations and errors. */
  private logger: Logger = new Logger(MedicationsService.name);

  /** Handles common error logging and throwing for service methods. */
  private handleError(error: string, errorMsg: string) {
    this.logger.error(error, errorMsg);
    throw new InternalServerErrorException(error, errorMsg);
  }

  public async getAllMedications() {
    try {
      return await this.medicationsRepo.findAll();
    } catch (err: any) {
      this.handleError(`Failed to get medication records`, err.message);
    }
  }

  public async getMedicationById(id: number) {
    try {
      const result = await this.medicationsRepo.findOne({ where: { id } });

      if (!result) {
        return new NotFoundException();
      }

      return result;
    } catch (err: any) {
      this.handleError(`Failed to get medication with id ${id}`, err.message);
    }
  }

  public async getAllMedicationsByPetId(id: number) {
    try {
      return await this.medicationsRepo.findAll({ where: { petId: id } });
    } catch (err: any) {
      this.handleError(
        `Failed to get medication record for pet id ${id}`,
        err.message,
      );
    }
  }
}
