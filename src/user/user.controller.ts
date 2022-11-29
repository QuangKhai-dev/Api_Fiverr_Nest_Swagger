import { UserUpdateDto } from './dto/user-update-dto';
import { UserDto } from './dto/user-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Users } from '@prisma/client';

@Controller('/user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async createUser(@Body() dto: UserDto): Promise<Users> {
    return this.userService.createUser(dto);
  }

  @Get('/getAll')
  async getAllUser(): Promise<Users[]> {
    return await this.userService.findAllUser();
  }

  @Put(':id')
  async updateUser(
    @Body() dto: UserUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.updateUser(id, dto);
  }

  @Post(':id')
  @ApiResponse({
    status: 200,
  })
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUserById(id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete user' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
