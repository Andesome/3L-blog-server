const Router = require('koa-router');
const models = require('../model');

const ArticlestModel = models.getModel('articles');
const projectRouter = new Router({
  prefix: '/api/blog',
});


// GET:项目列表
projectRouter.get('/articles', async (ctx, next) => {
  const projectList = await ArticlestModel.find({});
  ctx.body = {
    msg: 'articles list',
    data: projectList,
  };
});

// GET: 项目详情
projectRouter.get('/articles/:id', async (ctx, next) => {
  const reqParams = ctx.params;
  const project = await ArticlestModel.find({ _id: reqParams.id });
  ctx.body = {
    msg: 'project detail',
    data: project,
  };
});

// POST: 新增项目
// {
//   "title":"test",
//   "content":"test",
//   "create_time":123456
// }
projectRouter.post('/articles', async (ctx, next) => {
  const reqBody = ctx.request.body;
  const project = new ArticlestModel(reqBody);
  const res = await project.save((err) => {
    console.log('save satatus:', err);
  });
  ctx.body = {
    msg: 'new project',
    data: res,
  };
});

// DELETE: 删除项目
projectRouter.delete('/articles', async (ctx, next) => {
  const { ids } = ctx.request.body;
  const res = await ArticlestModel.remove({ _id: { $in: ids } });
  ctx.body = {
    msg: 'delete project',
    data: res,
  };
});

// PUT: 更新项目
projectRouter.put('/articles/:id', async (ctx, next) => {
  const reqBody = ctx.request.body;
  const { id } = ctx.params;
  console.log('--', id, reqBody);
  const res = await ArticlestModel.update({ _id: id }, reqBody);
  ctx.body = {
    msg: 'change project',
    data: res,
  };
});


module.exports = projectRouter;

