import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  //Separa a inicialização da aplicação e permitindo que quem inicie o server tenha controle total de como o server será inicializado
  //1° controi o SetupServer e depois chama o init. Não chama no construtor pois teremos operações assincronas.
  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }
  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }
  private setupControllers(): void {
    const forecastController = new ForecastController();
    //Passar para o overnight que faz o setup no express
    this.addControllers([forecastController]);
  }
  public getApp(): Application {
    return this.app;
  }
}
