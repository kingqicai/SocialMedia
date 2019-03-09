const Controller = require('egg').Controller;

class DetailController extends Controller {
    //查看详情
    async detail() {
        if(isNaN(this.ctx.params.id) || this.ctx.params.id < 1){
            //await this.ctx.render('404.tpl');
            return false;
        }
        let id =  Math.floor(this.ctx.params.id) || 1;
       
        let rows = await this.ctx.service.news.getNewsById(id);
        if(rows == null ){
            return false;
        }
        
        this.ctx.locals.rows = rows;
        
        await this.ctx.render('./detail.ejs');
    };
};

module.exports = DetailController;