import {INestApplication, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

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

    static addSwagger() {
        const config = new DocumentBuilder()
            .setTitle('Рулю practical')
            .setDescription('Giga Uga Buga')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup('swagger', this.app, document);

        return this;
    }

    static async start(callback: (port: number) => any) {
        const port = 3000;
        await this.app.listen(port, () => callback(port));
    }
}