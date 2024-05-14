import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    role: Role
}

export class LoginDto{
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    role: Role
}

export enum Role {
    USER = "user",
    ADMIN = "admin"
}