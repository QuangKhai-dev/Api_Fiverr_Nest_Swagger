import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  birthday: string;

  @IsBoolean()
  @ApiProperty()
  gender: boolean;

  @IsString()
  @ApiProperty()
  description: string;
}
