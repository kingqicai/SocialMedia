'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
    /**
     * 根据新闻ID，查找新闻
     * @param {String} nid 新闻ID
     * @return {Promise[news]} 承载用户的 Promise 对象
     */
    async getNewsById(nid) {
        if (!nid) {
            return null;
        }
        let data = await this.ctx.model.News.findById(nid);
        return data;
    }

    //获取负面新闻分页
    async getNegNewsPage(index) {
        return this.ctx.model.News.findNewsByPage(index);
    }

    //获取正面新闻分页
    async getPosNewsPage(index) {
        return this.ctx.model.News.findNewsByPage(index);
    }
   
    async getWebSrcTodayCnt() {
        return this.ctx.model.News.getWebSrcTodayCnt();
    }

    async getWeiboSrcTodayCnt() {
        return this.ctx.model.News.getWeiboSrcTodayCnt();
    }

    async getWeChatSrcTodayCnt() {
        return this.ctx.model.News.getWeChatSrcTodayCnt();
    }

    async getOtherSrcTodayCnt() {
        return this.ctx.model.News.getOtherSrcTodayCnt();
    }

    async getWebSrcTotalCnt() {
        return this.ctx.model.News.count({
            where: {"src_type": 0}
        });
    }
    async getWeiboSrcTotalCnt() {
        return this.ctx.model.News.count({
            where: {"src_type": 1}
        });
    }
    async getWeChatSrcTotalCnt() {
        return this.ctx.model.News.count({
            where: {"src_type": 2}
        });
    }
    async getOtherSrcTotalCnt() {
        return this.ctx.model.News.count({
            where: {"src_type": 3}
        });
    }

}

module.exports = NewsService;
