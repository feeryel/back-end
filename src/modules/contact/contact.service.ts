import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/contact-create.dto';
import { UpdateContactDto } from './dto/contact-update.dto';
import { Contact } from './model/contact.model';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly _contactRepository: Repository<Contact>,
  ) {}

  // Create contact
  async createContact(createContactDto: CreateContactDto) {
    const contact = await this._contactRepository.save(createContactDto);
    return contact;
  }
  // Update contact
  async updateContact(id: string, updateContactDto: UpdateContactDto) {
    return await this._contactRepository.update(id, updateContactDto);
  }
  // Get all contacts
  async getAllContacts(): Promise<Contact[]> {
    return await this._contactRepository.find();
  }
  // Get one contact
  async getContact(id: string) {
    return await this._contactRepository.findOne({ where: { id: id } });
  }
  // delete contact
  async deleteContact(id: string) {
    return await this._contactRepository.delete(id);
  }
}
