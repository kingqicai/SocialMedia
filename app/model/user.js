'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    // 类型说明请移步
    // http://sequelize.readthedocs.io/en/v3/docs/models-definition/
    const User = app.model.define(
        // 默认表名（一般这里写单数），生成时会自动转换成复数形式
        // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
        'users',
        {
            id: {
                type: STRING(36),
                primaryKey: true,
                autoIncrement: false
            },
            login_name: STRING(30), // 用户登陆名
            pass: STRING(100), // 登陆密码
            avatar: STRING(255), // 用户头像
            company: STRING(255), // 公司
            telephone: STRING(30), // 手机号
            create_time: DATE, // 创建时间
            update_time: DATE, // 更新时间
            register_time: DATE, // 注册时间
            is_admin: INTEGER, // 是否是管理员(0-不是,1-是)
            deleted: INTEGER, // 删除标志(0-正常,1-删除)
            last_sign_in_time: DATE, // 最后一次登陆时间
            delete_time: DATE
        },
        {
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步。必需
            tableName: 'users', // 数据库表名
            timestamps: false // 是否自动添加时间戳createdAt，updatedAt。必需
        }
    );

    // 使用说明
    // https://github.com/eggjs/egg-sequelize
    // 已有的方法说明
    // http://sequelize.readthedocs.io/en/v3/docs/models-usage/
    // 详细介绍
    // https://segmentfault.com/a/1190000003987871

    User.prototype.logSignin = function* () {
        yield this.update({ last_sign_in_time: new Date() });
    };

    return User;
};
