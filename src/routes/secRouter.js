const Router = require('koa-router');
const models = require('../model');

const SectModel = models.getModel('sec');
const secRouter = new Router({
  prefix: '/api/blog',
});


// POST: 新增记录
// {
//   "title":"test",
//   "content":"test",
//   "create_time":123456
// }
secRouter.post('/sec', async (ctx, next) => {
  const reqBody = ctx.request.body;
  console.log(reqBody);
  const project = new SectModel(reqBody);
  const res = await project.save((err) => {
    console.log('save satatus:', err);
  });
  ctx.body = {
    msg: 'new sec',
    data: res,
  };
});


module.exports = secRouter;

