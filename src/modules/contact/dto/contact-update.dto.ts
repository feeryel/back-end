import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './contact-create.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
