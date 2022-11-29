import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // async validateUser(email: string, pass: string) {
  //   const user = await this.prisma.users.findUnique({
  //     where: {
  //       email
  //     }
  //   });
  //   const isMatch = await bcrypt.compare(pass, user.password);

  //   if (user && isMatch && user.isActivated) {
  //     const payload = { id: user.id, uuid: user.uuid, role: user.role };

  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   }

  //   return null;
  // }
}
