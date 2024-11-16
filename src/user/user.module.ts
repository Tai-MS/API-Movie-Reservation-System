import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Importa el servicio Prisma
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../middleware/verifyToken';

@Module({
  providers: [UserService, PrismaService, AuthService], // Inyecta el servicio Prisma en el módulo
  controllers: [UserController],
})
export class UserModule {}
