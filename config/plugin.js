'use strict';

// had enabled by egg exports.static = true; 开启 validate 校验
exports.validate = {
    enable: true,
    package: 'egg-validate'
};

// 使用模版引擎
exports.ejs = {
    enable: true,
    package: 'egg-view-ejs'
};

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};

exports.oss = {
    enable: true,
    package: 'egg-oss'
};

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
};

exports.passport = {
    enable: true,
    package: 'egg-passport'
};

exports.passportLocal = {
    enable: true,
    package: 'egg-passport-local'
};
