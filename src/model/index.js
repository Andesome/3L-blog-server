const mongoose = require('mongoose');
const { DB_URL } = require('../constant/privateConfig.js');

mongoose.Promise = global.Promise;

// 连接数据库
mongoose.connect(
  DB_URL,
  (err, db) => {
    if (!err) {
      console.log('connected success');
    } else {
      console.log('connected fail');
    }
  }
);

const models = {
  user: {
    name: String,
    age: Number,
    sex: String,
    birthday: String,
    avatar: String,
    create_time: { type: Date, require: true },
  },
  project: {
    title: { type: String, require: false },
    content: { type: String, require: true },
    author: { type: String, require: true },
    tags: { type: String, require: false },
    comments: { type: Array, require: false },
    create_time: { type: Number, require: true },
  },
  articles: {
    title: { type: String, require: false },
    author: { type: String, require: true },
    content: { type: String, require: true },
    tags: { type: String, require: false },
    comments: [
      {
        postId: { type: String, require: true },
        fromID: { type: String, default: null },
        toId: { type: String, default: null },
        from: String,
        to: String,
        content: String,
        like: { type: Number, default: 0 },
        create_time: Date,
      },
    ],
    views: { type: Number, require: false, default: 0 },
    update_time: { type: Number, require: false },
    create_time: { type: Number, require: true },
  },
  sec: {
    navigator: { type: Object },
    create_time: { type: Number, require: true },
  },
  counters: {
    _id: { type: String, require: true },
    views: 0,
  },
};

for (const m in models) {
  if (Object.prototype.hasOwnProperty.call(models, m)) {
    mongoose.model(m, new mongoose.Schema(models[m]));
  }
}

module.exports = {
  getModel(name) {
    return mongoose.model(name);
  },
};
