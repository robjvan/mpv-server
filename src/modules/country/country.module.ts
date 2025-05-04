import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { countryProviders } from './country.providers';

@Module({
  controllers: [CountryController],
  providers: [CountryService, ...countryProviders],
})
export class CountryModule {}
