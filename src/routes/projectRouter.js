const Router = require('koa-router');
const models = require('../model');

const ProjectModel = models.getModel('project');
const projectRouter = new Router({
  prefix: '/api/blog',
});


// GET:项目列表
projectRouter.get('/projects', async (ctx, next) => {
  const projectList = await ProjectModel.find({});
  ctx.body = {
    msg: 'project list',
    data: projectList,
  };
});

// GET: 项目详情
projectRouter.get('/projects/:id', async (ctx, next) => {
  const reqParams = ctx.params;
  const project = await ProjectModel.find({ _id: reqParams.id });
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
projectRouter.post('/projects', async (ctx, next) => {
  const reqBody = ctx.request.body;
  const project = new ProjectModel(reqBody);
  const res = await project.save((err) => {
    console.log('save satatus:', err);
  });
  ctx.body = {
    msg: 'new project',
    data: res,
  };
});

// DELETE: 删除项目
projectRouter.delete('/projects', async (ctx, next) => {
  const { ids } = ctx.request.body;
  const res = await ProjectModel.remove({ _id: { $in: ids } });
  ctx.body = {
    msg: 'delete project',
    data: res,
  };
});

// PUT: 更新项目
projectRouter.put('/projects/:id', async (ctx, next) => {
  const reqBody = ctx.request.body;
  const { id } = ctx.params;
  console.log('--', id, reqBody);
  const res = await ProjectModel.update({ _id: id }, reqBody);
  ctx.body = {
    msg: 'change project',
    data: res,
  };
});


module.exports = projectRouter;

