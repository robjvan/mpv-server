import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PetModel } from './models/pet.model';
import { PetSpeciesModel } from './models/pet-species.model';
import { PetBreedModel } from './models/pet-breed.model';
import {
  PETS_BREEDS_REPOSITORY,
  PETS_REPOSITORY,
  PETS_SPECIES_REPOSITORY,
} from 'src/utilities/constants';

/**
 * PetsService provides business logic for managing pets, their breeds, and species.
 * This service interacts with Sequelize models and supports robust error handling and logging.
 */
@Injectable()
export class PetsService {
  constructor(
    @Inject(PETS_REPOSITORY)
    private readonly petsRepo: typeof PetModel,
    @Inject(PETS_SPECIES_REPOSITORY)
    private readonly petSpeciesRepo: typeof PetSpeciesModel,
    @Inject(PETS_BREEDS_REPOSITORY)
    private readonly petBreedsRepo: typeof PetBreedModel,
  ) {}

  /** Logger instance scoped to PetsService for tracking and recording service-level operations and errors. */
  private logger: Logger = new Logger(PetsService.name);

  /** Centralized repository map for DRY and type-based lookup */
  private readonly repoMap: Record<string, any> = {
    Pet: this.petsRepo,
    'Pet Species': this.petSpeciesRepo,
    'Pet Breed': this.petBreedsRepo,
  };

  /**
   * Centralized error handler with logging and exception throwing.
   * @param context - Description of where the error occurred.
   * @param error - The raw error message.
   */
  private handleError(error: string, errorMsg: string) {
    this.logger.error(error, errorMsg);
    throw new InternalServerErrorException(error, errorMsg);
  }

  /**
   * Generic method to fetch a single record by ID from a named repository.
   * @param type - The human-readable key of the repository ('Pet', 'Pet Breed', etc.)
   * @param id - The ID to look up
   */
  private async findOneOrFail<T>(type: string, id: number): Promise<T> {
    const repo = this.repoMap[type];
    if (!repo) {
      throw new Error(`Repository for type "${type}" not found.`);
    }

    try {
      const result = await repo.findOne({ where: { id } });
      if (!result) {
        throw new NotFoundException(`${type} with ID ${id} not found`);
      }
      return result;
    } catch (err: any) {
      if (err instanceof NotFoundException) throw err;
      this.handleError(
        `Failed to fetch ${type.toLowerCase()} with ID ${id}`,
        err.message,
      );
    }
  }

  /** Fetch all pets in the system */
  public async getAllPets() {
    try {
      return await this.petsRepo.findAll();
    } catch (err: any) {
      this.handleError(`Failed to fetch pet records`, err.message);
    }
  }

  /**
   * Fetch a pet by its ID.
   * @param id - Pet ID
   */
  public async getPetById(id: number) {
    return this.findOneOrFail<PetModel>('Pet', id);
  }

  /**
   * Get all pets belonging to a specific user.
   * @param id - User ID
   */
  public async getPetsByUserId(id: number) {
    try {
      return this.petsRepo.findAll({ where: { ownerId: id } });
    } catch (err: any) {
      this.handleError(
        `Failed to get pet records for user id ${id}`,
        err.message,
      );
    }
  }

  /** Get all pet species (e.g., Dog, Cat) */
  public async getAllPetSpecies() {
    try {
      return await this.petSpeciesRepo.findAll();
    } catch (err: any) {
      this.handleError(`Failed to fetch pet species records`, err.message);
    }
  }

  /**
   * Get a specific species by ID
   * @param id - Species ID
   */
  public async getPetSpeciesById(id: number) {
    return this.findOneOrFail<PetSpeciesModel>('Pet Species', id);
  }

  /** Get all breeds (e.g., Labrador, Tabby) */
  public async getAllPetBreeds() {
    try {
      return await this.petBreedsRepo.findAll();
    } catch (err: any) {
      this.handleError(`Failed to fetch pet breed records`, err.message);
    }
  }

  /**
   * Get a specific breed by ID
   * @param id - Breed ID
   */
  public async getPetBreedById(id: number) {
    return this.findOneOrFail<PetBreedModel>('Pet Breed', id);
  }
}
