// import { strict as assert } from 'node:assert';
import mock, { MockApplication } from 'egg-mock';
import type {} from '..';
import assert from 'node:assert';

describe('test/consul.test.ts', () => {
  let app: MockApplication;

  before(() => {
    app = mock.app({
      baseDir: 'apps/consulapp',
    });
    return app.ready();
  });

  beforeEach(async () => {
    // init test datas
    // try {
    //   console.log(app.consul);
    // } catch (err) {
    //   console.log('init test datas error: %s', err);
    // }
  });

  afterEach(mock.restore);
  after(() => app.close());


  it('should GET /consul/health/self/check', () => {
    // console.log(app);
    return app.httpRequest()
      .get('/consul/health/self/check')
      .expect('{"status":"success"}')
      .expect(200);
  });

  it('should consul balancer', async () => {
    const ctx = app.mockContext();
    const res = await ctx.service.balancer.getServiceBalancer().select('ocr');
    assert.equal(res.ServiceName, 'ocr');
  });
});
