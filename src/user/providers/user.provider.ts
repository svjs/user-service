import {Connection} from 'mongoose';
import {UserSchema} from "../schemes/user.scheme";
import {CONNECTIONS, MODELS} from "../../consts";

export const userProviders = [
	{
		provide: MODELS.USER,
		inject: [CONNECTIONS.USERS],
		useFactory: (connection: Connection) => connection.model('User', UserSchema)
	}
]