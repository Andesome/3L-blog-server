const Router = require('koa-router');
const models = require('../model');

const ArticlestModel = models.getModel('articles');
const articleRouter = new Router({
  prefix: '/api/blog',
});


// GET:文章列表
articleRouter.get('/articles', async (ctx, next) => {
  const projectList = await ArticlestModel.find({});
  ctx.body = {
    msg: 'articles list',
    data: projectList,
  };
});

// GET: 文章详情
articleRouter.get('/articles/:id', async (ctx, next) => {
  const reqParams = ctx.params;
  const project = await ArticlestModel.findOne({ _id: reqParams.id });
  ctx.body = {
    msg: 'articles detail',
    data: project,
  };
});

// POST: 新增文章
// {
//   "title":"test",
//   "content":"test",
//   "create_time":123456
// }
articleRouter.post('/articles', async (ctx, next) => {
  const reqBody = ctx.request.body;
  const project = new ArticlestModel(reqBody);
  const res = await project.save((err) => {
    console.log('save satatus:', err);
  });
  ctx.body = {
    msg: 'new articles',
    data: res,
  };
});

// DELETE: 删除文章
articleRouter.delete('/articles', async (ctx, next) => {
  const { ids } = ctx.request.body;
  const res = await ArticlestModel.remove({ _id: { $in: ids } });
  ctx.body = {
    msg: 'delete project',
    data: res,
  };
});

// PUT: 更新文章
articleRouter.put('/articles/:id', async (ctx, next) => {
  const reqBody = ctx.request.body;
  const { id } = ctx.params;
  console.log('--', id, reqBody);
  const res = await ArticlestModel.update({ _id: id }, reqBody);
  ctx.body = {
    msg: 'change project',
    data: res,
  };
});


module.exports = articleRouter;

