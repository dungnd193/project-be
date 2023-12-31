import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, password, role, email, phoneNumber } =
        authCredentialsDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await this.usersRepository.save({
        username,
        password: hashedPassword,
        role: role || 'ROLE_USER',
        email,
        phoneNumber,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      const { username, password } = authCredentialsDto;
      const user = await this.usersRepository.findOneBy({ username });

      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: IJWTPayload = { username, role: user.role };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check your login credentials!');
      }
    } catch (error) {
      throw new UnauthorizedException('Please check your login credentials!');
    }
  }

  async getUserInfo(req: any): Promise<any> {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing Authorization Bearer token');
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      let payload = this.jwtService.verify(token);

      // Assuming 'username' is the property in the payload that represents the user's username
      const user = await this.usersRepository.findOne({ where: { username: payload.username } });

      if (user) {
        payload = user; // Add other user-related information as needed
        delete payload.password
        delete payload.id
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async updateUserInfo(req: any, updateData: Partial<User>): Promise<void> {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing Authorization Bearer token');
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const payload: IJWTPayload = this.jwtService.verify(token);
      const username = payload.username;

      // Assuming 'username' is the property in the payload that represents the user's username
      const existingUser = await this.usersRepository.findOne({ where: { username } });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // Update only the provided fields in updateData
      await this.usersRepository.update(existingUser.id, updateData);
    } catch (error) {
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid or missing Authorization Bearer token');
      } else {
        throw new InternalServerErrorException('Failed to update user information');
      }
    }
  }
}
