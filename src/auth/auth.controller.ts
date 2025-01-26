import {
  Get,
  Req,
  Post,
  Body,
  Headers,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities';
import { UserRoleGuard } from './guards';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser, RawHeader, RoleProtected } from './decorators';
import { IValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() req: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,

    @RawHeader() rawHeaders: string[],
    @Headers() headers: string[],
  ) {
    console.log(req);
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }

  // @SetMetadata('roles', ['admin', 'super-user'])
  @Get('private2')
  @RoleProtected(IValidRoles.superuser, IValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRouter2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  // @Auth()
  @Auth(IValidRoles.admin)
  privateRouter3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
