import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/User.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(
    firstName: string,
    lastName: string,
    profilePhoto: string,
    username: string,
    mobileNumber: string,
  ) {
    const newUser = this.userRepository.create({
      firstName,
      lastName,
      profilePhoto,
      username,
      mobileNumber,
    });
    return await this.userRepository.save(newUser);
  }

  async updateUser(
    id: number,
    firstName: string,
    lastName: string,
    profilePhoto: string,
    mobileNumber: string,
  ) {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    userToUpdate.firstName = firstName;
    userToUpdate.lastName = lastName;
    userToUpdate.profilePhoto = profilePhoto;
    userToUpdate.mobileNumber = mobileNumber;
    return await this.userRepository.save(userToUpdate);
  }

  async deleteUser(id: number) {
    const userToDelete = await this.userRepository.findOne({ where: { id } });
    if (!userToDelete) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(userToDelete);
    return true;
  }
}
