import { Controller } from '@nestjs/common';
import { SubversionService } from './subversion.service';

@Controller('subversion')
export class SubversionController {
  constructor(private readonly subversionService: SubversionService) {}
}
