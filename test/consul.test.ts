// import { strict as assert } from 'node:assert';
import mock, { MockApplication } from 'egg-mock';
import type {} from '..';
import assert from 'node:assert';

describe('test/consul.test.ts', () => {
  let app: MockApplication;

  before(async () => {
    app = mock.app({
      baseDir: 'apps/consulapp',
    });
    return await app.ready();
  });

  afterEach(mock.restore);
  after(() => app.close());

  it('should GET /consul/health/self/check', () => {
    return app
      .httpRequest()
      .get('/consul/health/self/check')
      .expect('{"status":"success"}')
      .expect(200);
  });

  it('should consul balancer', async () => {
    try {
      await app.consul.balancer.getServiceBalancer().select('consul');
    } catch (error) {
      assert.strictEqual(error.message, 'no available instance named consul');
    }
  });
});
