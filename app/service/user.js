'use strict';
const uuid = require('uuid');
const utility = require('utility');
const Service = require('egg').Service;

// 引入常量
const CONSTANTS = require('../constants');

class UserService extends Service {
    /**
     * 根据用户ID，查找用户
     * @param {String} id 用户ID
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    async getUserById(id) {
        if (!id) {
            return null;
        }
        return this.ctx.model.User.findById(id);
    }

    /**
     * 根据 loginName 查询用户
     * @param {String} loginName 登陆名
     * @returns {Object} users
     */
    async getUserByLoginName(loginName) {
        return this.ctx.model.User.findOne({
            where: { login_name: loginName, deleted: 0 }
        });
    }

    /**
     * 获取当前登陆人信息
     * @param {String} userId 用户Id
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    async getCurrentUser(userId) {
        return this.ctx.model.User.findOne({
            where: {
                id: userId
            },
            attributes: ['id', 'login_name']
        });
    }

    /**
     * 创建用户
     * @param {Object} options
     */
    async newAndSave(userVo) {
        const newUser = Object.assign(
            {
                id: uuid.v4(),
                create_time: new Date(), // 创建时间 `now()` on db server
                register_time: new Date(), // 创建时间 `now()` on db server
                deleted: 0 // 未被删除
            },
            userVo
        );

        const user = this.ctx.model.User.build(newUser);

        return user.save();
    }

    /**
     * 管理员创建用户，直接给正常的权限
     * @param {Object} options
     */
    async createUserByAdmin(options) {
        options = Object.assign(
            {
                id:
                    new Date().getTime() +
                    this.ctx.helper.generateRandomString(5, 'num'),
                integral: 100, // 信用积分默认为0
                create_time: new Date(), // 创建时间
                register_time: new Date(), // 申请时间
                deleted: CONSTANTS.BOOL_FALSE,
                status: CONSTANTS.USER_STATUS_NORMAL // 直接给正常
            },
            options
        );

        const user = this.ctx.model.User.build(options);

        return user.save();
    }

    /**
     * 删除用户
     * @param {String} userId 用户ID
     */
    async deleteUser(userId) {
        return await this.ctx.model.User.update(
            {
                deleted: CONSTANTS.BOOL_TRUE,
                delete_time: new Date()
            },
            {
                where: {
                    id: userId
                }
            }
        );
    }

    /**
     * 获取用户信息
     */
    async getUsers(options) {
        return this.ctx.model.User.findAndCountAll(options);
    }

    async getUserInfo(user) {
        return {
            user_name: user.user_name,
            display_name: user.name,
            school: user.school,
            college: user.college,
            professional: user.professional,
            telephone_number: user.telephone_number,
            qq: user.qq,
            type: user.type,
            guide_teacher: user.guide_teacher,
            sex: user.sex,
            integral: user.integral,
            wechat_bind_status: user.wechat_id ? 1 : 0,
            headimgurl: ''
        };
    }

    makeGravatar(loginname) {
        return (
            'http://www.gravatar.com/avatar/' +
            utility.md5(loginname.toLowerCase()) +
            '?size=48'
        );
    }
    getGravatar(user) {
        return user.avatar || this.makeGravatar(user.email);
    }
}

module.exports = UserService;
