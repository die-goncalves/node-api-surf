import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import { BeachesController } from './controllers/beaches';
import { Application } from 'express';
import * as database from '@src/database';
import { UsersController } from './controllers/users';
import logger from './logger';
import * as http from 'http';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import apiSchema from './api-schema.json';
/* eslint-disable @typescript-eslint/no-var-requires */
const OpenApiValidator = require('express-openapi-validator'); // Import the express-openapi-validator library
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { apiErrorValidator } from './middlewares/api-error-validator';

export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private port = 3000) {
    super();
  }

  //Separa a inicialização da aplicação e permitindo que quem inicie o server tenha controle total de como o server será inicializado
  //1° controi o SetupServer e depois chama o init. Não chama no construtor pois teremos operações assincronas.
  public async init(): Promise<void> {
    this.setupExpress();
    await this.docsSetup();
    this.setupControllers();
    await this.databaseSetup();
    //must be the last
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      expressPino({
        logger,
      })
    );
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();
    //Passar para o overnight que faz o setup no express
    this.addControllers([
      forecastController,
      beachesController,
      usersController,
    ]);
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  // Install the OpenApiValidator onto your express app
  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: apiSchema as OpenAPIV3.Document,
        validateRequests: true, //we do it
        validateResponses: true,
      })
    );
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }
}
