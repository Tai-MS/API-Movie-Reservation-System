import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, UserStatus, UserRole } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Aquí, 'verifyEmail' puede retornar un User o false
  async verifyEmail(email: string): Promise<boolean | User> {
    const userExists = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (!userExists) {
      return false;
    }
    return userExists;
  }

  // El tipo de retorno aquí debe ser 'User' o un mensaje de error si el usuario ya existe.
  async createUser(data: {
    username: string;
    password: string;
    email: string;
  }): Promise<User | string> {
    // El tipo es User o un string (mensaje de error)
    const verifyingUser = await this.verifyEmail(data.email);
    console.log(verifyingUser);

    if (verifyingUser) {
      return 'User already in use'; // Regresa un mensaje si el usuario ya existe.
    }

    return this.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
        status: UserStatus.AVAILABLE,
        role: UserRole.NORMAL,
      },
    });
  }

  // Aquí puedes devolver un 'string' o un 'User'
  async getUser(email: string): Promise<string | User | boolean> {
    const verifyingUser = await this.verifyEmail(email);
    if (!verifyingUser) {
      return 'User not found'; // Mensaje si no se encuentra el usuario
    }
    return verifyingUser; // Si se encuentra, devuelve el usuario.
  }
}
