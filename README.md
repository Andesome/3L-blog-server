# 接口地址

 接口前缀 /api/blog

# 文章相关

## 获取文章列表

> Get: /articles

## 查询文章详情

> Get: /articles/{文章 ID}

## 新增文章

> POST: /articles

### 请求参数

|   参数名    | 必选 |  类型  | 说明       |
| :---------: | :--: | :----: | :--------- |
|    title    |  是  | String | 标题       |
|   author    |  否  | String | 作者       |
|   content   |  是  | String | 内容       |
| create_time |  是  |  Int   | 时间戳(秒) |

### 请求示例

```json
{
	"title":"测试文章",
	"content":"## 标题",
	"author":"andesong",
	"create_time":{{$timestamp}}
}
```

### 返回示例

```
无
```

## 删除文章（一篇或多篇）

> delete: /articles

### 请求参数

| 必选 | 类型 |   说明   |
| :--: | :--: | :------: |
| ids  |  是  | String[] | 要删出文章的 id 数组 |

## 更新一篇文章

> delete: /articles/{文章 ID}

### 请求参数

|   参数名    | 必选 |  类型  | 说明               |
| :---------: | :--: | :----: | ------------------ |
|    title    |  是  | String | 标题               |
|   author    |  否  | String | 作者               |
|   content   |  是  | String | 内容               |
| update_time |  是  |  Int   | 文章更新时间戳(秒) |

## 新增评论

> post: /comment/{文章 ID}

### 请求参数

|  必选   | 类型 |  说明  |
| :-----: | :--: | :----: |
| fromId  |  是  | String | 评论者 |
|  toId   |  否  | String | 被回复者 Id(有就传) |
| content |  是  | String | 内容 |

## 评论点赞

> get: /comment/${commentId}

|   必选    | 类型 |  说明  |
| :-------: | :--: | :----: |
| commentId |  是  | String | 评论 ID |

# 搜索

## 搜索文章

> get: /search/articles?keyword=${keyword}

支持模糊搜索，可根据文章标题及内容搜索
