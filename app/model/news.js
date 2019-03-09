'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const News = app.model.define(
        'news',
        {
            nid: {
                type: INTEGER(11),
                primaryKey: true,
                autoIncrement: false
            },
            title: STRING(64), 
            content: STRING(512), 
            create_time: DATE, 
            source: STRING(255), 
            website: STRING(255),
            src_type:INTEGER
        }, {
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步。必需
            tableName: 'news', // 数据库表名
            timestamps: false // 是否自动添加时间戳createdAt，updatedAt。必需
        }
    );

    //由id查找新闻
    News.findOneNews = function (id) {
        return app.model.News.findOne({
            where: {"nid": id}
        });
    }

    //查找新闻分页
    News.findNewsByPage = function (index) {
        let indexs = (index -1)*10;
        let row = 10;

        return app.model.News.findAndCountAll({
            order: [
                ['create_time', 'DESC']
            ],
            limit: row,
            offset: indexs
        });
    }

    News.getWebSrcTodayCnt = function() {
        return app.model.News.count({
            where: { 
                $and: [
                    'src_type' == 0,
                    app.Sequelize.where(
                        app.Sequelize.fn('DATE', app.Sequelize.col('create_time')),
                        app.Sequelize.literal('CURRENT_DATE')
                    )
                ]
            }
        });
    }
    News.getWeiboSrcTodayCnt = function() {
        return app.model.News.count({
            where: { 
                $and: [
                    'src_type' == 1,
                    app.Sequelize.where(
                        app.Sequelize.fn('DATE', app.Sequelize.col('create_time')),
                        app.Sequelize.literal('CURRENT_DATE')
                    )
                ]
            }
        });
    }
    News.getWeChatSrcTodayCnt = function() {
        return app.model.News.count({
            where: { 
                $and: [
                    'src_type' == 2,
                    app.Sequelize.where(
                        app.Sequelize.fn('DATE', app.Sequelize.col('create_time')),
                        app.Sequelize.literal('CURRENT_DATE')
                    )
                ]
            }
        });
    }
    News.getOtherSrcTodayCnt = function() {
        return app.model.News.count({
            where: { 
                $and: [
                    'src_type' == 3,
                    app.Sequelize.where(
                        app.Sequelize.fn('DATE', app.Sequelize.col('create_time')),
                        app.Sequelize.literal('CURRENT_DATE')
                    )
                ]
            }
        });
    }

    return News;
};
