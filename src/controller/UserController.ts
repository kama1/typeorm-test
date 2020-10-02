import { EntityTarget } from "typeorm";
import { User } from "../entity/User";
import { SuperController } from "./SuperController";

export class UserController extends SuperController {

    getEntity(): EntityTarget<unknown> {
        return User;
    }

}