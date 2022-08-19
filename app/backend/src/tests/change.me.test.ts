import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

/* const userModel = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
}; */

  describe('Seu teste', () => {
    let chaiHttpResponse: Response;
  
/*     before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves({
          ...userModel
        } as User);
    });
 
   after(()=>{
     (User.findOne as sinon.SinonStub).restore();
   })
 */
    it('Verifica o login com email e password corretos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });
  
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  
    it('Verifica se é possível fazer login sem a senha', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com' });
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.equal({ message: 'All fields must be filled' });
    });
  
    it('Verifica se é possível fazer login sem o email', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'secret_admin' });
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.equal({ message: 'All fields must be filled' });
    });
  });

