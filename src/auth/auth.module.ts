import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User' ,schema: UserSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) =>{
            return {
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: config.get<string | number>('JWT_EXPIRE'),
                },
            }
        }
        
    })
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}