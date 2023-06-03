import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './post-create.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
