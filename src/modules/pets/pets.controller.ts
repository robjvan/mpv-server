import { Controller, Get, Param } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  public getAllPets() {
    return this.petsService.getAllPets();
  }

  @Get('/:id')
  public getPetById(@Param('id') id: number) {
    return this.petsService.getPetById(id);
  }

  @Get('/species')
  public getAllPetSpecies() {
    return this.petsService.getAllPetSpecies();
  }

  @Get('/species/:id')
  public getSpeciesById(@Param('id') id: number) {
    return this.petsService.getPetSpeciesById(id);
  }

  @Get('/breeds')
  public getAllPetBreeds() {
    return this.petsService.getAllPetBreeds();
  }

  @Get('/breeds/:id')
  public getBreedById(@Param('id') id: number) {
    return this.petsService.getPetBreedById(id);
  }

  @Get('/user/:id')
  public getPetsByUserId(@Param('id') id: number) {
    return this.petsService.getPetsByUserId(id);
  }
}
