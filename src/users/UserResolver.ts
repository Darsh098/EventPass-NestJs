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

  @Query((returns) => User, { name: 'getUserByClerkId' })
  async getUserByClerkId(@Args('clerkId') clerkId: string) {
    return await this.userService.findUserByClerkId(clerkId);
  }

  @Mutation((returns) => User, { name: 'createUser' })
  async createUser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('clerkId') clerkId: string,
    @Args('email') email: string,
    @Args('profilePhoto', { nullable: true }) profilePhoto: string,
    @Args('mobileNumber', { nullable: true }) mobileNumber: string,
  ) {
    return await this.userService.createUser(
      firstName,
      lastName,
      clerkId,
      email,
      profilePhoto,
      mobileNumber,
    );
  }

  @Mutation((returns) => User, { name: 'updateUser' })
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('profilePhoto', { nullable: true }) profilePhoto: string,
    @Args('mobileNumber', { nullable: true }) mobileNumber: string,
  ) {
    return await this.userService.updateUser(
      id,
      firstName,
      lastName,
      email,
      profilePhoto,
      mobileNumber,
    );
  }

  @Mutation((returns) => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.deleteUser(id);
  }
}
