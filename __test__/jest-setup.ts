//Arquivo responsavel por inicializar o servidor para todos os testes funcionais
import { SetupServer } from '@src/server';
import supertest from 'supertest';

beforeAll(() => { //roda antes de todos os testes da aplicação
  const server = new SetupServer();
  server.init();
  global.testRequest = supertest(server.getApp());
})