# SocialMedia
copyright for us

# Social-Media-Monitor

## 依赖
- [egg](https://eggjs.org)
- [layui](http://www.layui.com/)

## 快速入门

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发
- [mac 环境安装](https://www.jianshu.com/p/aa8933a40b78).

### 创建数据库
```bash
$ mysql -u root -p
$ create database socialMediaMonitor
$ use socialMediaMonitor
$ source /your_path_src/script/install/init_table.sql
```

### 开发环境

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

### 工作设想
- 统计数据单独存表，在更新数据库时，完成数据统计
- 网站只负责数据mysql查询展现
- 可以采用js调用python的方式，对指定文本进行功能处理
- 网站新闻数据库，可采用定时任务方式对数据进行更新
