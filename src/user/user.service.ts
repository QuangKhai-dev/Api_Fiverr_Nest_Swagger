import { UserUpdateDto } from './dto/user-update-dto';
import { SALT_OR_ROUND } from './../util/salt.rounds';
import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: UserDto) {
    //check existing email
    const existingMail = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingMail != null) {
      //throw để ném ra lỗi
      throw new ForbiddenException('Email already exists');
    }
    const hashing = await bcrypt.hash(dto.password, SALT_OR_ROUND);
    const user = await this.prisma.users.create({
      data: { ...dto, password: hashing },
    });
    delete user.password;
    return user;
  }

  //lát quay lại làm bước check token nữa
  async findUserById(id: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
        include: {
          skills: true,
          certifications: true,
        },
      });
      console.log(user);
      if (user !== null) {
        delete user.password;
        return user;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Find all user
  async findAllUser() {
    try {
      const users = await this.prisma.users.findMany();

      //chạy for each để xóa password
      users.forEach((user) => {
        delete user.password;
      });

      return users;
    } catch (err) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: number, dto: UserUpdateDto) {
    //check existing email
    const existingMail = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (existingMail == null) {
      //throw để ném ra lỗi
      throw new ForbiddenException('User not found');
    }
    try {
      const { skills, certifications, ...userInfo } = dto;
      const addSkills = await this.prisma.skills.createMany({
        data: skills,
      });
      const addCertifications = await this.prisma.certifications.createMany({
        data: certifications,
      });
      const hashingPass = await bcrypt.hash(userInfo.password, SALT_OR_ROUND);
      await this.prisma.users.update({
        where: {
          id,
        },
        data: {
          ...userInfo,
          password: hashingPass,
        },
      });
      return { ...userInfo, addSkills, addCertifications };
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUser(id: number) {
    try {
      await this.prisma.users.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
