import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('REST API Tests - GET /api/sum', () => {

  it('should return sum for valid inputs', async () => {
    const res = await chai.request(app).get('/api/sum?a=4&b=6');
    expect(res).to.have.status(200);
    expect(res.body.result).to.equal(10);
  });

  it('should return error for invalid inputs', async () => {
    const res = await chai.request(app).get('/api/sum?a=x&b=2');
    expect(res).to.have.status(400);
  });

});
