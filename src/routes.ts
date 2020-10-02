import { PhotoController } from "./controller/PhotoController";
import { UserController } from "./controller/UserController";

export const Routes = [
    ...UserController.getRoutes(),
    ...PhotoController.getRoutes()
]