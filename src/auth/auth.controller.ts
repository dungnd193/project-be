import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/userInfo')
  async getUserInfo(@Req() req: any): Promise<any> {
    const userInfo = await this.authService.getUserInfo(req);
    return userInfo;
  }

  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp({ ...authCredentialsDto });
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn({ ...authCredentialsDto });
  }

  @Patch('/updateUserInfo')
  async updateUserInfo(
    @Req() req: any,
    @Body() updateData: Partial<User>,
  ): Promise<void> {
    return this.authService.updateUserInfo(req, updateData);
  }
}
