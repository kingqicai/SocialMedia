'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async portal() {
        await this.ctx.render('/portal', {
            pageTitle: '欢迎页'
        }, {layout: 'indexLayout.html'});
    }

    async index() {
        /*
        await this
            .ctx
            .render('index');
        */
        this.ctx.config = {
            keywords:"nlp,text summary",
            description:"舆情监控",
            title:"舆情监控系统"
        };

        //const page = await this.ctx.service.jie.page(1);
        
        const page = await this.ctx.service.news.getNegNewsPage(1);
        this.ctx.locals.pages = page;


        const page1 = await this.ctx.service.news.getNegNewsPage(2);
        this.ctx.locals.pages1 = page1;

        const page2 = await this.ctx.service.news.getNegNewsPage(3);
        this.ctx.locals.pages2 = page2;

        this.ctx.locals.webTodayCnt = await this.ctx.service.news.getWebSrcTodayCnt();
        this.ctx.locals.weiboTodayCnt = await this.ctx.service.news.getWeiboSrcTodayCnt();
        this.ctx.locals.wechatTodayCnt = await this.ctx.service.news.getWeChatSrcTodayCnt();
        this.ctx.locals.otherTodayCnt = await this.ctx.service.news.getOtherSrcTodayCnt();
        
        this.ctx.locals.webTotalCnt = await this.ctx.service.news.getWebSrcTotalCnt();
        this.ctx.locals.weiboTotalCnt = await this.ctx.service.news.getWeiboSrcTotalCnt();
        this.ctx.locals.wechatTotalCnt = await this.ctx.service.news.getWeChatSrcTotalCnt();
        this.ctx.locals.otherTotalCnt = await this.ctx.service.news.getOtherSrcTotalCnt();

        await this.ctx.render('index.html')
    }
}

module.exports = HomeController;
