import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

  describe('Testes', () => {
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
  });
