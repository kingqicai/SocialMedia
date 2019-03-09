/* eslint-disable */
//
layui
    .define([
        'layer',
        'form',
        'upload',
        'util'
    ], function (exports) {
        let $ = layui.jquery,
            layer = layui.layer,
            form = layui.form,
            util = layui.util,
            device = layui.device();

        //阻止IE7以下访问
        if (device.ie && device.ie < 10) {
            layer.alert('请使用IE10+浏览器');
        }

        //表单提交
        form
            .on('submit(*)', function (data) {
                var action = $(data.form).attr('action'),
                    button = $(data.elem);
                fly.json(action, data.field, function (res) {
                    var end = function () {
                        if (res.action) {
                            location.href = res.action;
                        } else {
                            fly.form[action || button.attr('key')](data.field, data.form);
                        }
                    };
                    if (res.status == 0) {
                        button.attr('alert')
                            ? layer.alert(res.msg, {
                                icon: 1,
                                time: 10 *1000,
                                end: end
                            })
                            : end();
                    };
                });
                return false;
            });

        var app = {
            //Ajax
            json: function (url, data, success, options) {
                var that = this,
                    type = typeof data === 'function';

                if (type) {
                    options = success
                    success = data;
                    data = {};
                }

                options = options || {};

                return $.ajax({
                    type: options.type || 'post',
                    dataType: options.dataType || 'json',
                    data: data,
                    url: url,
                    success: function (res) {
                        if (res.status === 0) {
                            success && success(res);
                        } else {
                            layer.msg(res.msg || res.code, {shift: 6});
                            options.error && options.error();
                        }
                    },
                    error: function (e) {
                        layer.msg('请求异常，请重试', {shift: 6});
                        options.error && options.error(e);
                    }
                });
            }
        }

        exports('app', app);
    })
