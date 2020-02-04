import {Controller} from '@nestjs/common';
import {UserService} from "./user.service";
import {MessagePattern} from "@nestjs/microservices";

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	) {
		console.log('User controller created');
	}

	@MessagePattern({cmd: 'user.create'})
	async createUser(data: { login: string, password: string }): Promise<boolean> {
		await this.userService.create(data);
		return true;
	}
}
