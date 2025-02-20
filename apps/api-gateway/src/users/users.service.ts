import { CreateUserDto, PaginationDto, USER_SERVICE_NAME, UpdateUserDto, UserServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {

  private usersService: UserServiceClient;

  constructor(
    @Inject(AUTH_SERVICE) private client: ClientGrpc,
  ) {}

  onModuleInit() {
      this.usersService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll() {
    return this.usersService.findAllUsers({});
  }

  findOne(id: string) {
    return this.usersService.findUniqUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({id, ...updateUserDto});
  }

  remove(id: string) {
    return this.usersService.deleteUser({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationDto>();
    users$.next({page: 0, skip: 25});
    users$.next({page: 1, skip: 25});
    users$.next({page: 2, skip: 25});
    users$.next({page: 3, skip: 25});

    users$.complete();

    let chunkNunber = 0;

    this.usersService.queryUsers(users$).subscribe( users => {
      console.log(`Chunk number: ${chunkNunber}`);
      console.log(users);
      chunkNunber++;
    })


  }

}
