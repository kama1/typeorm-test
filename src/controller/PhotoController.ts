import { EntityTarget } from "typeorm";
import { Photo } from "../entity/Photo";
import { SuperController } from "./SuperController";

export class PhotoController extends SuperController {

    getEntity(): EntityTarget<unknown> {
        return Photo;
    }

}