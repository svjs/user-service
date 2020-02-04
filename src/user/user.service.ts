import {Inject, Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {User} from "./interfaces/user.interface";
import {MODELS} from "../consts";
import {v4 as uuid} from 'uuid';

@Injectable()
export class UserService {
	constructor(
		@Inject(MODELS.USER)
		private readonly userModel: Model<User>
	) {
	}


	async create(data: { login: string, password: string }): Promise<boolean | { error: string }> {

		const isAlreadyRegistered = await this.userModel.findOne({login: data.login});
		if (isAlreadyRegistered) return {
			error: 'Sorry, this login is already used.'
		};

		const user = new this.userModel({
			id: uuid(),
			login: data.login,
			password: data.password
		});
		try {
			await user.save();
		} catch (e) {
			console.error(e);
			return {
				error: 'Internal server error, please try again later',
			}
		}

		return true;
	}

	async getUserByLoginAndPassword(login: string, password: string): Promise<User> {
		return this.userModel.findOne({
			login,
			password
		});
	}
}
