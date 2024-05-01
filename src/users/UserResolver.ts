import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { User } from 'src/models/User.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => [User], { name: 'getAllUsers' })
  async getAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Query((returns) => User, { name: 'getUserById' })
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findUserById(id);
  }

  @Mutation((returns) => User, { name: 'createUser' })
  async createUser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('profilePhoto', { nullable: true }) profilePhoto: string,
    @Args('username') username: string,
    @Args('mobileNumber', { nullable: true }) mobileNumber: string,
  ) {
    return await this.userService.createUser(
      firstName,
      lastName,
      profilePhoto,
      username,
      mobileNumber,
    );
  }

  @Mutation((returns) => User, { name: 'updateUser' })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('firstName', { nullable: true }) firstName: string,
    @Args('lastName', { nullable: true }) lastName: string,
    @Args('profilePhoto', { nullable: true }) profilePhoto: string,
    @Args('mobileNumber', { nullable: true }) mobileNumber: string,
  ) {
    return await this.userService.updateUser(
      id,
      firstName,
      lastName,
      profilePhoto,
      mobileNumber,
    );
  }

  @Mutation((returns) => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.deleteUser(id);
  }
}
