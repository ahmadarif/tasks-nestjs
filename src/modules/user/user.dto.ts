import { IsEmail, IsNotEmpty } from "class-validator";
import { AccessToken } from "src/models/accesstoken";
import { User } from "src/models/user";

export class RegisterDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class LoginDTO {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}

export class AuthDto {
    @IsNotEmpty()
    accessToken: AccessToken;
    @IsNotEmpty()
    userData: User;
}