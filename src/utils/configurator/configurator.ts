import {INestApplication, ValidationPipe} from "@nestjs/common";

export default class Configurator {
    static app: INestApplication;

    static init(app: INestApplication) {
        this.app = app;

        return this;
    }

    static addDefaultPipes() {
        this.app.useGlobalPipes(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                transform: true,
                whitelist: true,
            }),
        );

        return this;
    }

    static async start(callback: (port: number) => any) {
        const port = 3000;
        await this.app.listen(port, () => callback(port));
    }
}