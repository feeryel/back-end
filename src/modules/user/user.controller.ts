import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
  Req,
  BadRequestException,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { User } from './model/user.model';
import { GetUser } from './user.decorator';
import { UserService } from './user.service';
import { Request } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //   @Post method
  // Register user
  // path : /register
  @Post('user/register')
  // @Roles(Role.Admin)
  async register(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    return await this.userService.createUser(createUserDto, req);
  }
  //   @put method
  // update user
  // path : :id/update
  @Put('user/:id/update')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }
  //   @get method
  // get all users
  // path : /users
  @Get('user/users')
  // @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.Admin])
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  //   @get method
  // get one user
  // path : :id/user
  @Get('user/:id/user')
  // @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.Admin])
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }
  //   @delete method
  // delete user
  // path : /delete
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
  //   @Post method
  // Login user
  // path : /login
  @Post('user/login')
  // @UseGuards(JwtAuthGuard)
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(
      createUserDto.email,
      createUserDto.password,
    );
  }
  //   @Get method
  // Get current user
  // path : /current
  @UseGuards(JwtAuthGuard)
  @Get('user/current')
  async currentUser(@GetUser() user: User) {
    return user;
  }
  //   @Get method
  // Get query user
  // path : /query
  @UseGuards(JwtAuthGuard)
  @Get('query')
  async searchUser(@Query('firstName') firstName: string) {
    return await this.userService.searchUser(firstName);
  }
}
