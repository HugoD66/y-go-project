import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
export declare class UsersService {
  private usersRepository;
  private readonly jwtService;
  constructor(usersRepository: Repository<User>, jwtService: JwtService);
  create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  login(loginDto: LoginDto): Promise<LoginResponseDto>;
  findOne(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  update(id: string, updateUserDto: Partial<User>): Promise<UserResponseDto>;
  remove(id: string): Promise<void>;
}
