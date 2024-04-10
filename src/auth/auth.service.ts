import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { LoginDto, SignUpDto } from 'src/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private usersModel: mongoose.Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(userInfo: SignUpDto): Promise<{token: string}>{
    let { name, email, password} = userInfo;
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = await this.usersModel.create({
        name,
        email,
        password: hashedPassword
    })

    let token = this.jwtService.sign({ id: user._id});
    return {token}
  }

  async login(userInfo: LoginDto): Promise<{ token: string }> {
    let { email, password } = userInfo;
    let user = await this.usersModel.findOne({email});

    let passwordMatched = await bcrypt.compare(password, user.password)
    if (!user || !passwordMatched) {
        throw new UnauthorizedException('Invalid email or password');
    }
    let token = this.jwtService.sign({ id: user._id});
    return {token}
  }
}