import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, UserStatus, UserRole } from '@prisma/client';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { generateAuthToken } from 'src/utils/generateToken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  /**
   *
   * @param data
   * @returns
   */
  async verifyEmail(email: string): Promise<User | null> {
    const userExists = await this.prisma.user.findFirst({
      where: { email: email },
    });

    return userExists || null;
  }
  /**
   *
   * @param data
   * @returns
   */
  async createUser(data: {
    username: string;
    password: string;
    email: string;
  }): Promise<User | string> {
    const verifyingUser = await this.verifyEmail(data.email);

    if (verifyingUser) {
      return 'User already in use';
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);

    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hash,
        email: data.email,
        status: UserStatus.AVAILABLE,
        role: UserRole.NORMAL,
      },
    });
  }
  /**
   *
   * @param data
   * @returns
   */
  async getUser(email: string): Promise<string | User | boolean> {
    const verifyingUser = await this.verifyEmail(email);
    if (!verifyingUser) {
      return 'User not found';
    }
    return verifyingUser;
  }
  /**
   *
   * @param data
   * @returns
   */
  async getAll() {
    const getUsers = await this.prisma.user.findMany();
    return getUsers.length ? getUsers : 'No users saved yet';
  }
  /**
   *
   * @param data
   * @returns
   */
  async updateUser(
    data: Partial<{
      username: string;
      email: string;
      password: string;
      status: UserStatus;
      role: UserRole;
      token: string;
      token_lifetime: Date;
    }>,
  ): Promise<string> {
    const user = await this.verifyEmail(data.email);
    if (!user) {
      return 'User not found';
    }
    const isDataDifferent = Object.entries(data).some(
      ([key, value]) => user[key] !== value,
    );

    if (isDataDifferent) {
      await this.prisma.user.update({
        where: { email: data.email },
        data: data,
      });
    }
    return 'User updated';
  }

  /**
   *This is a logical delete changing the status fields to DISABLE
   *The user itself is going to be there in the table
   * @param email
   * @returns an error or the message "user deleted"
   */
  async deleteUser(email: string) {
    try {
      this.updateUser({
        email: email,
        status: UserStatus.DISABLE,
      });
      return 'User deleted';
    } catch (error) {
      return error;
    }
  }

  async login(data: { email: string; password: string; response: Response }) {
    try {
      const user = await this.verifyEmail(data.email);
      const res = data.response;
      if (!user) {
        return 'User not found';
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        return 'Incorrect credentials';
      }
      res.cookie('auth-token', generateAuthToken(), {
        httpOnly: true,
        maxAge: 3600000,
      });
      const token = generateAuthToken();
      const expiresIn = new Date(Date.now() + 3600000);
      const newData = {
        email: data.email,
        token: token,
        token_lifetime: expiresIn,
      };
      res.cookie('auth-token', token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      this.updateUser(newData);
      return 'Logged in';
    } catch (error) {
      return error;
    }
  }

  // async verifyToken(token: string) {
  //   try {
  //     const findUser = await this.prisma.user.findFirst({
  //       where: {
  //         token: token,
  //         token_lifetime: {
  //           gt: new Date(),
  //         },
  //       },
  //     });
  //     return findUser;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
