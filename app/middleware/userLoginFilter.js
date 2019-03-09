'use strict';
// 已登录的用户可以通过该中间件，未登录的将被拦截

module.exports = () => {
    return async function getUserInfo(ctx, next) {
        const userId = ctx.cookies.get('user_id');
        if (userId) {
            const user = await ctx.service.uic.user.getUserById(userId);
            if (user && user.status & 1) {
                ctx.user = user;
                await next();
                return;
            }
            ctx.cookies.set('user_id', null);
        }
        if (!ctx.body) {
            ctx.status = 403;
            if (ctx.get('X-Requested-With') === 'XMLHttpRequest') {
                ctx.body = { message: '请先登录' };
                return;
            }
            ctx.body = '请先登录';
        }
    };
};
