import { Body, Controller, Post, Req } from "@nestjs/common";
import { response, responseError } from "src/helpers/response.helper";
import { AuthDto, LoginDTO, RegisterDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() body: RegisterDTO) {
        try {
            const result = await this.userService.register(body);
            return response('Register successfully', result);
        } catch(e) {
            return responseError(e.message);
        }
    }

    @Post('login')
    async login(@Body() body: LoginDTO) {
        try {
            const result = await this.userService.login(body);
            return response('Login successfully', result);
        } catch(e) {
            return responseError(e.message);
        }
    }

    @Post('logout')
    async logout(@Req() req) {
        try {
            const auth: AuthDto = req.auth;
            const result = await this.userService.logout(auth);
            return response('Logout successfully', result);
        } catch(e) {
            return responseError(e.message);
        }
    }
}
