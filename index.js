const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const projectRouter = require('./src/routes/projectRouter');
const ArticleRouter = require('./src/routes/articleRouter');
const secRouter = require('./src/routes/secRouter');
const commentRouter = require('./src/routes/commentRouter');
const searchRouter = require('./src/routes/searchRouter');

const app = new Koa();
const router = new Router();
const PORT = 9600;

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'accept, accept-encoding, authorization, content-type, dnt, origin, user-agent, x-csrftoken, x-requested-with');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
});

app.use(async (ctx, next) => {
  const start = Date.now();
  try {
    await next();
  } catch (e) {
    // console.log('统一处理错误', e);
    ctx.body = {
      code: 500,
      msg: e.message,
      errorObject: {
        message: e.message,
        name: e.name,
        stringValue: e.stringValue,
        kind: e.kind,
        value: e.value,
        path: e.path,
        reason: e.reason,
      },
    };
  }
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// root
router.get('/', (ctx, next) => {
  ctx.body = 'home';
});

// test
router.get('/test', (ctx, next) => {
  ctx.body = { name: 'lll', age: 25 };
});

app
  .use(koaBody({ strict: false }))
  .use(router.routes())
  .use(projectRouter.routes())
  .use(ArticleRouter.routes())
  .use(secRouter.routes())
  .use(router.allowedMethods())
  .use(commentRouter.routes())
  .use(searchRouter.routes());

app.listen(PORT, () => {
  console.log(`服务器在${PORT}端口运行`);
});
