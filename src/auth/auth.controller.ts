import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {
	}

	@MessagePattern({cmd: 'auth.get'})
	async authGet(cookie: {}): Promise<{ loggedIn: boolean, info?: {} }> {
		console.log(cookie);
		return {
			loggedIn: false
		};
	}


	@MessagePattern({cmd: 'auth.do'})
	async authDo(data: { login: string, password: string }): Promise<boolean> {
		console.log(data);
		return false;
	}
}
