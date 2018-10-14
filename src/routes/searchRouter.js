const Router = require('koa-router');
const models = require('../model');
const config = require('../constant/config');

const ArticlestModel = models.getModel('articles');

const searchRouter = new Router({
  prefix: config.prefix,
});

// 搜索文章
searchRouter.get('/search/articles', async (ctx) => {
  const { keyword = '', pageSize = config.defaultPageSize, page = 1 } = ctx.query;
  const limit = Number(pageSize);
  const skip = (Number(page) - 1) * limit;
  const reg = new RegExp(keyword, 'i');
  const articles = await ArticlestModel.find(
    {
      $or: [{ content: { $regex: reg } }, { title: { $regex: reg } }],
    },
    {
      comments: 0,
      __v: 0,
    },
    {
      sort: { create_time: -1 },
      skip,
      limit,
    }
  );

  ctx.body = {
    msg: '搜索文章',
    data: articles,
  };
});

module.exports = searchRouter;
