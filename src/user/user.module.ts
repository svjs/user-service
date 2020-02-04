import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {MongoModule} from "../mongo/mongo.module";
import {userProviders} from "./providers/user.provider";

@Module({
	providers: [UserService, ...userProviders],
	imports: [MongoModule],
	controllers: [UserController],
	exports: [UserService]
})
export class UserModule {
}
