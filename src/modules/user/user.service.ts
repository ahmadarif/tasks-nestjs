import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import * as bcrypt from 'bcryptjs';
import { AuthDto, LoginDTO, RegisterDTO } from "./user.dto";
import { User } from "src/models/user";
import { createToken } from "src/helpers/auth.helper";
import { AccessToken } from "src/models/accesstoken";

@Injectable()
export class UserService {
    async register(params: RegisterDTO) {
        try {
            const mindiff = moment().utcOffset();
            const now = moment().add(mindiff, 'minutes').toDate();
            const salt = await bcrypt.genSalt(10);
            const checkUsername = await User.createQueryBuilder('user')
                .where('user.username = :username', { username: params.username })
                .getCount();
            if (checkUsername > 0) throw new Error('Username already exist');
            const checkEmail = await User.createQueryBuilder('user')
                .where('user.email = :email', { email: params.email })
                .getCount();
            if (checkEmail > 0) throw new Error('Email already exist');
            const hashPassword = await bcrypt.hash(params.password, salt);
            await User.createQueryBuilder().insert().values({
                username: params.username,
                email: params.email,
                password: hashPassword,
                createdDate: now,
                modifiedDate: now,
            })
            .execute();
            return true;
        } catch(e) {
            throw e;
        }
    }

    async login(params: LoginDTO) {
        try {
            const findUser = await User.createQueryBuilder('user')
                .where('user.username = :username', { username: params.username })
                .getOne();
            if (!findUser) throw new Error('Account not found');
            const password = await bcrypt.compare(params.password, findUser.password);
            if (!password) throw new Error('Invalid credential(s)');
            const auth = await createToken(findUser.id);
            return {
                accessToken: auth.accessToken.id,
                userDate: auth.userData,
            };
        } catch(e) {
            throw e;
        }
    }

    async logout(params: AuthDto) {
        try {
            await AccessToken.createQueryBuilder('accessToken')
                .where('accessToken.id = :token', { token: params.accessToken.id })
                .delete()
                .execute();
            return true;
        } catch (e) {
            throw e;
        }
      }
}
