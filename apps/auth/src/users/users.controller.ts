import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, FindUniqUserDto, PaginationDto, UpdateUserDto, User, UserServiceController, UserServiceControllerMethods } from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController{
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findUniqUser(findUniqUserDto: FindUniqUserDto) {
    return this.usersService.findOne(findUniqUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  deleteUser(deleteUserDto: FindUniqUserDto) {
    return this.usersService.remove(deleteUserDto.id);
  }

  queryUsers(PaginationDto: Observable<PaginationDto>) {
    return this.usersService.queryUsers(PaginationDto);
  }

}
