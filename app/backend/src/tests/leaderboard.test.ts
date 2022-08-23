import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes para /leaderboard', () => {
  let chaiHttpResponse: Response;

  it('Verifica se retorna o placar dos times de "casa"', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica se retorna o placar dos times de "fora"', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});