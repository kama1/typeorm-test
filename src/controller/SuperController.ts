import { getRepository, EntityTarget } from "typeorm";
import { NextFunction, Request, Response } from "express";

export abstract class SuperController {

    abstract getEntity(): EntityTarget<unknown>

    private repository = getRepository(this.getEntity());

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            return this.repository.find();
        } catch (error) {
            console.error(error);
            response.status(500).send(error.message || error);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            return this.repository.findOne(request.params.id);
        } catch (error) {
            console.error(error);
            response.status(500).send(error.message || error);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            return await this.repository.save(request.body);
        } catch (error) {
            console.error(error);
            response.status(500).send(error.message || error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            let subject = await this.repository.findOne(request.params.id);
            return await this.repository.remove(subject);
        } catch (error) {
            console.error(error);
            response.status(500).send(error.message || error);
        }
    }

    static getRoutes() {
        const route = this.name.replace('Controller', '').toLowerCase();
        return [{
            method: "get",
            route: `/${route}`,
            controller: this,
            action: "all"
        }, {
            method: "get",
            route: `/${route}/:id`,
            controller: this,
            action: "one"
        }, {
            method: "post",
            route: `/${route}`,
            controller: this,
            action: "save"
        }, {
            method: "delete",
            route: `/${route}/:id`,
            controller: this,
            action: "remove"
        }];
    }
}