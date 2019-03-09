'use strict';

module.exports = appInfo => {
    const config = exports = {};

    config.name = '舆情监控系统';

    config.description = '舆情监控系统';

    config.site_logo = '/public/images/cnodejs_light.svg';

    config.site_icon = '/public/images/cnode_icon_32.png';

    // debug 为 true 时，用于本地调试
    config.debug = true;

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1519887194138_3450';

    config.host = '';

    config.session_secret = 'social_media_monitor_secret';

    // add your config here
    config.middleware = ['locals', 'authUser', 'errorPage', 'errorHandler'];

    config.cluster = {
        listen: {
            hostname: '0.0.0.0',
            port: 7001
        }
    };

    config.auth_cookie_name = 'social_media_monitor';

    // 只对 /api 前缀的 url 路径生效
    config.errorHandler = {
        match: '/api'
    };

    // 关闭安全插件，否则路由中的 post 请求会报错
    config.security = {
        csrf: false
    };

    // config.security = {
    //     csrf: {
    //         ignore: '/api/*/*'
    //     }
    // };

    config.passportLocal = {
        usernameField: 'loginname',
        passwordField: 'pass'
    };

    // session设置
    config.session = {
        key: 'social_media_monitor_secret',
        maxAge: 24 * 3600 * 1000, // 1 天
        httpOnly: true,
        encrypt: true
    };

    // 使用 egg-sequelize 进行数据层的处理
    // https://github.com/eggjs/examples/blob/master/sequelize-example/
    // config.sequelize = {
    //     dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    //     database: 'socialMediaMonitor',
    //     host: '58.87.126.126',
    //     port: '3306',
    //     username: 'root',
    //     password: '1qaz@WSX#EDC'
    // };
    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'socialMediaMonitor',
        host: '127.0.0.1',
        port: '3306',
        username: 'root',
        password: '123456'
    };

    // 模版引擎
    
    config.view = {
        defaultViewEngine: 'ejs',
        mapping: {
            '.html': 'ejs'
        }
    };
    config.ejs = {
        layout: 'layout.html'
    };

    // 添加 view 配置
    /*
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };*/

    // 打印所有级别的日志
    config.logger = {
        level: 'DEBUG',
        consoleLevel: 'DEBUG'
    };

    // debug 为 true 时，用于本地调试
    config.debug = true;

    return config;
};
