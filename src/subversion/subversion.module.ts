import { Module } from '@nestjs/common';
import { SubversionService } from './subversion.service';
import { SubversionController } from './subversion.controller';

@Module({
  controllers: [SubversionController],
  providers: [SubversionService]
})
export class SubversionModule {}
