import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Importa el servicio Prisma
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, PrismaService], // Inyecta el servicio Prisma en el módulo
  controllers: [UserController],
})
export class UserModule {}
