'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller, config, middleware} = app;

    const {site, sign, page,news} = controller;

    const userRequired = middleware.userRequired();
    const adminRequired = middleware.adminRequired();

    // home page
    router.get('/', site.portal);

    // 控制台
    router.get('/index', userRequired, site.index);

    // sign controller 跳转到注册页面
    router.get('/signup', sign.showSignup);
    // 提交注册信息
    router.post('/signup', sign.signup);

    // 本地登录
    const localStrategy = app
        .passport
        .authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin'
        });

    

    router.get('/signin', sign.showLogin); // 进入登录页面
    router.post('/passport/local', localStrategy);
    router.all('/signout', sign.signout); // 登出

    router.get('/:id', controller.news.detail);

    router.get('/search_pass', sign.showSearchPass); // 找回密码页面
    router.get('/reset_pass', sign.resetPass); // 进入重置密码页面
    router.post('/reset_pass', sign.updatePass); // 更新密码

    // router.get('/setting', userRequired, xxx); // router.post('/user/set_star',
    // adminRequired, zzz); // static page
    router.get('/about', page.about);
};
