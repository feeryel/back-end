import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/model/user.model';

dotenv.config();

export interface JwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string[];
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.login(email);
    // comparaison password
    if (await bcrypt.compare(password, user.password)) {
      //delete password for security reason
      delete user.password;
      // return user login
      return user as User;
    }
    return null;
  }
  async login(email: string, password: string) {
    const userData = await this.validateUser(email, password);
    if (userData == null) {
      throw new BadRequestException('invalid email or password');
    }
    const payload: JwtPayload = {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
    };
    const result = {
      
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
    console.log(result.access_token);
    return result;
  }
}
