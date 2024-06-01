import { ContactDto } from '../../dtos/auth/register-user.dto';
import { ContactEntity } from '../../entities/user.entity';
import { ContactsRepository } from '../../repositories/auth.repository';

interface CreateContactUseCase {
  execute: ( contactDto: ContactDto ) => Promise<ContactEntity|undefined>
}


export class CreateContact implements CreateContactUseCase{

  constructor(
    private readonly contactRepository: ContactsRepository,
  ){}

  async execute( contactDto: ContactDto ): Promise<ContactEntity|undefined>{
    
    const contactExists = await this.contactRepository.getUserByEmail( contactDto.email );
    if ( contactExists ) {
      throw new Error('Contact already exists');
    }
    
    const contact = await this.contactRepository.createContact( contactDto );
    return contact;
  }

}