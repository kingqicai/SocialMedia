'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
    async about() {
        await this
            .ctx
            .render('static/about', {pageTitle: '关于我们'});
    }
}

module.exports = PageController;
