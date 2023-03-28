import type { Context } from 'egg';

export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    console.log('path', ctx.path);
    if (ctx.path === '/consul/health/self/check') {
      ctx.body = {
        status: 'success',
      };
    } else {
      await next();
    }
  };
};
