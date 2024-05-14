import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "src/schemas/user.schema";
import mongoose from "mongoose";
import { Strategy, ExtractJwt } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload){
        let {id} = payload;
        let user = await this.userModel.findById(id);

        if(!user){
            throw new UnauthorizedException("Login to access this endpoint");
        }

        return user;
    }
}