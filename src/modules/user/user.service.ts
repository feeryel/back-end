import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}
  // Register user
  async createUser(createUserDto: CreateUserDto, req: Request) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 12);
    let confirmPassword: string = req.body.confirmPassword;
    const isConfirmPassword = await bcrypt.compare(
      confirmPassword,
      hashPassword,
    );
    if (!isConfirmPassword) {
      throw new BadRequestException('password does not match');
    } else {
      const user = await this._userRepository.save({
        ...createUserDto,
        password: hashPassword,
      });

      delete user.password;
      return user;
    }
  }
  // Update user
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this._userRepository.update(id, updateUserDto);
  }
  // Get all users
  async getAllUsers() {
    return await this._userRepository.find();
  }
  // Get one user
  async getUser(id: string) {
    return await this._userRepository.findOne({ where: { id: id } });
  }

  // delete user
  async deleteUser(id: string) {
    return await this._userRepository.delete(id);
  }
  // Login
  async login(email: string) {
    const loginUser = await this._userRepository.findOneBy({ email });
    if (!loginUser) {
      throw new BadRequestException('invalid email or password');
    }
    return loginUser;
  }

  // Login
  async searchUser(firstName: string) {
    return await this._userRepository
      .createQueryBuilder('user')
      //ykharej firstName eli naatihomlah ane fel path fil postman b akher zouz hrouf aal ymin (RIGHT)
      .where(
        // ye yekhdm aal ekher zouz aal ymin ye awel 3 hrouf aal ysar (OR)
        'RIGHT(user.firstName,2) = :name OR LEFT(user.firstName,3) = :name ',
        { name: firstName },
      )
      .getMany();
  }
}
