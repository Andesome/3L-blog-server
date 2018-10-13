const Router = require('koa-router');
const models = require('../model');
const config = require('../constant/config');

const ArticlestModel = models.getModel('articles');

const commentRouter = new Router({
  prefix: config.prefix,
});

/**
 * 插入评论
 */
commentRouter.post('/comment/:postId', async (ctx) => {
  const reqBody = ctx.request.body;
  const { postId } = ctx.params;
  const article = await ArticlestModel.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $push: { comments: { postId, ...reqBody, create_time: new Date() } },
    },
    {
      new: true,
    }
  );
  ctx.body = {
    msg: '新增评论',
    data: article,
  };
});

/**
 * 给评论点赞
 */
commentRouter.get('/comment/:commentId', async (ctx) => {
  const { commentId } = ctx.params;
  await ArticlestModel.update(
    {
      'comments._id': commentId,
    },
    {
      $inc: { 'comments.$.like': 1 },
    }
  );
  ctx.body = {
    msg: '评论点赞成功',
    data: null,
  };
});

module.exports = commentRouter;
