'use strict';

const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');
const Controller = require('egg').Controller;

const CONSTANTS = require('../constants');

class SignController extends Controller {
    async showLogin() {
        const {ctx} = this;
        await ctx.render('/sign/signin', {
            pageTitle: '登录'
        }, {layout: 'indexLayout.html'});
    }

    // sign up
    async showSignup() {
        const {ctx} = this;
        await ctx.render('/sign/signup', {
            pageTitle: '注册'
        }, {layout: 'indexLayout.html'});
    }

    // 用户注册
    async signup() {
        const response = {
            code: CONSTANTS.CODE_ERROR,
            message: ''
        };

        const {ctx, service} = this;
        const loginname = validator
            .trim(ctx.request.body.loginname || '')
            .toLowerCase();
        const telephone = validator
            .trim(ctx.request.body.telephone || '')
            .toLowerCase();
        const pass = validator.trim(ctx.request.body.pass || '');
        const rePass = validator.trim(ctx.request.body.re_pass || '');
        const company = validator.trim(ctx.request.body.company);

        let msg;
        // 验证信息的正确性
        if ([loginname, pass, rePass, telephone].some(item => {
            return item === '';
        })) {
            msg = '信息不完整。';
        } else if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(telephone)) {
            msg = '手机号码不合法。';
        } else if (pass !== rePass) {
            msg = '两次密码输入不一致。';
        }
        // END 验证信息的正确性

        if (msg) {
            ctx.status = 422;
            ctx.body = {
                code: CONSTANTS.CODE_ERROR,
                message: msg
            };
            return;
        }

        // 根据用户名查询是否已经存在用户了
        const user = await service.user.getUserByLoginName(loginname);

        if (user) {
            ctx.status = 422;
            ctx.body = {
                code: CONSTANTS.CODE_ERROR,
                message: '用户名已被使用'
            };
            return;
        }

        // pass hash
        const passhash = ctx
            .helper
            .bhash(pass);

        // 创建一个头像信息
        const avatarUrl = service
            .user
            .makeGravatar(loginname);

        const result = await service
            .user
            .newAndSave({login_name: loginname, pass: passhash, telephone, company, avatar: avatarUrl});

        if (result) {
            response.message = '创建用户成功';
            response.code = CONSTANTS.CODE_SUCCESS;
        } else {
            response.message = '创建用户失败';
        }

        ctx.body = response;
        ctx.status = 200;
    }

    async signout() {
        const {ctx} = this;
        ctx.session = null;
        ctx.logout();
        ctx.redirect('/');
    }

    async showSearchPass() {
        await this
            .ctx
            .render('sign/search_pass');
    }

    async resetPass() {
        const {ctx, service} = this;
        const key = validator.trim(ctx.query.key || '');
        const name = validator.trim(ctx.query.name || '');

        const user = await service
            .user
            .getUserByNameAndKey(name, key);
        if (!user) {
            ctx.status = 403;
            await this
                .ctx
                .render('notify/notify', {error: '信息有误，密码无法重置。'});
            return;
        }

        const now = Date.now();
        const oneDay = 1000 * 60 * 60 * 24;
        if (!user.retrieve_time || now - user.retrieve_time > oneDay) {
            ctx.status = 403;
            await this
                .ctx
                .render('notify/notify', {error: '该链接已过期，请重新申请。'});
            return;
        }
        await this
            .ctx
            .render('sign/reset', {name, key});
    }

    async updatePass() {
        const {ctx, service} = this;
        const psw = validator.trim(ctx.request.body.psw) || '';
        const repsw = validator.trim(ctx.request.body.repsw) || '';
        const key = validator.trim(ctx.request.body.key) || '';
        const name = validator.trim(ctx.request.body.name) || '';

        if (psw !== repsw) {
            await this
                .ctx
                .render('sign/reset', {name, key, error: '两次密码输入不一致。'});
            return;
        }
        const user = await service
            .user
            .getUserByNameAndKey(name, key);

        if (!user) {
            await this
                .ctx
                .render('notify/notify', {error: '错误的激活链接'});
            return;
        }
        const passhash = ctx
            .helper
            .bhash(psw);
        user.pass = passhash;
        user.retrieve_key = null;
        user.retrieve_time = null;
        user.active = true; // 用户激活

        await user.save();
        await this
            .ctx
            .render('notify/notify', {success: '你的密码已重置。'});
    }
}

module.exports = SignController;
