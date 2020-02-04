import {Controller} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {MessagePattern} from "@nestjs/microservices";
import {TAuthDo} from "./auth.types";

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {
	}

	@MessagePattern({cmd: 'auth.do'})
	async authDo(data: TAuthDo): Promise<false | { loggedIn: boolean, info?: {} }> {
		const user = await this.userService.getUserByLoginAndPassword(data.login, data.password);

		return false;
	}

	@MessagePattern({cmd: 'auth.new-user'})
	async authNewUser(data: { login: string, password: string }): Promise<boolean | { error: string }> {
		return await this.userService.create(data);
	}
}
