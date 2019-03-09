'use strict';

module.exports = app => {
    if (app.config.debug) {
        app
            .config
            .coreMiddleware
            .unshift('less');
    }

    const localHandler = async(ctx, {username, password}) => {
        const getUser = username => {
            return ctx.service.user.getUserByLoginName(username);
        };
        const existUser = await getUser(username);

        // 用户不存在
        if (!existUser) {
            return null;
        }

        const passhash = existUser.pass;
        // TODO: change to async compare
        const equal = ctx
            .helper
            .bcompare(password, passhash);
        // 密码不匹配
        if (!equal) {
            return null;
        }

        // 验证通过
        return existUser;
    };

    app
        .passport
        .verify(async(ctx, user) => {
            ctx.logger.debug('passport.verify', user);
            const existUser = await localHandler(ctx, user);
            ctx.logger.debug('existUser', existUser);
            if (existUser) {
                // id存入Cookie, 用于验证过期.
                const auth_token = existUser.id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
                const opts = {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    signed: true,
                    httpOnly: true
                };
                ctx
                    .cookies
                    .set(app.config.auth_cookie_name, auth_token, opts); // cookie 有效期30天
            }

            return existUser;
        });

    app
        .passport
        .deserializeUser(async(ctx, user) => {
            if (user) {
                const auth_token = ctx
                    .cookies
                    .get(ctx.app.config.auth_cookie_name, {signed: true});

                if (!auth_token) {
                    return user;
                }

                const auth = auth_token.split('$$$$');
                const user_id = auth[0];
                user = await ctx
                    .service
                    .user
                    .getUserById(user_id);

                if (!user) {
                    return user;
                }
            }

            return user;
        });
};
