import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes para /teams', () => {
  let chaiHttpResponse: Response;

  it('Verifica se retorna os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});