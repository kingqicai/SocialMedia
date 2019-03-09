'use strict';

module.exports = () => {

    /*
   * 需要登录
   */
    return async function (ctx, next) {
        if (!ctx.user || !ctx.user.id) {
            // ctx.status = 401;
            // ctx.body = '请先登录';
            ctx.redirect('/signin');
            return;
        }
        await next();
    };
};
