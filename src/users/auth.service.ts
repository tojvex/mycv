import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt,} from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }


    async singup(email: string, password: string) {
        const users = await this.usersService.find(email)

        if(users.length) {
            throw new BadRequestException('email in use')
        }
        const salt  = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const hashedAndSaltedPassword = salt + '.' + hash.toString('hex');

        const user = await this.usersService.create(email, hashedAndSaltedPassword);

        return user

    }

    signin() {

    }

}