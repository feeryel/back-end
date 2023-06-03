import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateContactDto } from './dto/contact-create.dto';
import { UpdateContactDto } from './dto/contact-update.dto';
import { ContactService } from './contact.service';
import { Contact } from './model/contact.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  //   @Post method
  // create contact
  // path : /create
  @Post('contact/create')
  async newContact(@Body() createContactDto: CreateContactDto) {
    const creation = await this.contactService.createContact(createContactDto);
    if (!creation) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
    return { creation, status: 201, message: 'Contact created successfully' };
  }
  //   @get method
  // get one contact
  // path : :id/contact
  @Get('contact/:id')
  // @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.Admin])
  async getContact(@Param('id') id: string) {
    return await this.contactService.getContact(id);
  }
  //   @delete method
  // delete contact
  // path : /delete
  @Delete('contact/:id/delete')
  // @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.Admin])
  async deleteContact(@Param('id') id: string) {
    const deleted = await this.contactService.deleteContact(id);
    return {
      deleted,
      status: 200,
      message: 'Contact deleted successfully',
    };
  }

  @Put('contact/:id/update')
  async updateReport(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.contactService.updateContact(id, updateContactDto);
  }
  //   @get method
  // get all contacts
  // path : /contacts
  @Get('contacts')
  // @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.Admin])
  async getAllContacts(): Promise<Contact[]> {
    return await this.contactService.getAllContacts();
  }
}
