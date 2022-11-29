import { ApiProperty } from '@nestjs/swagger';
import { Certifications, Skills } from '@prisma/client';
import { IsArray, IsBoolean, IsString } from 'class-validator';
import { UserDto } from './user-dto';

export class UserUpdateDto extends UserDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  birthday: string;

  @ApiProperty()
  @IsBoolean()
  gender: true;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty({
    example: [
      {
        name: 'string',
        categorySkills: 'string',
        userId: 0,
        categorySkillsId: 0,
      },
    ],
  })
  @IsArray()
  skills: Skills[];
  @ApiProperty({
    example: [
      {
        name: 'string',
        url: 'string',
        userId: 1,
      },
    ],
  })
  @IsArray()
  certifications: Certifications[];
}
