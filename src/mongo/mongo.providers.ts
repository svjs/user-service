import * as mongoose from 'mongoose';
import {CONNECTIONS} from "../consts";

console.log(mongoose.connect);

export const databaseProviders = [
	{
		provide: CONNECTIONS.USERS,
		useFactory: (): Promise<typeof mongoose> => mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true})
	}
];