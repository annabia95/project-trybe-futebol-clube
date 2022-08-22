import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const mockJwt = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYxMTc1Nzc3LCJleHAiOjE2NjE3ODA1Nzd9.KEEssFHuiZAMy6HNIdJ0hMjMZZtQtMuR0zf1GEWtwg0"
}


describe('Testes para /matches', () => {
  let chaiHttpResponse: Response;

  it('Verifica se retorna as partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica se cria partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ "authorization": mockJwt.token })
      .send({
        homeTeam: 16,
        awayTeam: 8, 
        homeTeamGoals: 2,
        awayTeamGoals: 2
      })

    expect(chaiHttpResponse.status).to.be.equal(201);
  });

  it('Verifica se posso cadastrar partidas com números iguais de time', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ "authorization": mockJwt.token })
      .send({
        homeTeam: 16,
        awayTeam: 16, 
        homeTeamGoals: 2,
        awayTeamGoals: 2
      })

    expect(chaiHttpResponse.status).to.be.equal(401);
  });


  it('Verifica se posso cadastrar partidas com números de times que não existem', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ "authorization": mockJwt.token })
      .send({
        homeTeam: 60,
        awayTeam: 16, 
        homeTeamGoals: 2,
        awayTeamGoals: 2
      })

    expect(chaiHttpResponse.status).to.be.equal(404);
  });

  it('Verifica se posso atualizar uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/41/finish')
      .set({ "authorization": mockJwt.token })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eql({ "message": "Finished" })
  });

  it('Verifica se posso atualizar o placar de uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eql({ "message": "Updated!" })
  });
});