CREATE TABLE `users` (
  `id` varchar(50) NOT NULL DEFAULT '' COMMENT 'id',
  `login_name` varchar(30) NOT NULL DEFAULT '' COMMENT '登录名',
  `pass` varchar(100) NOT NULL DEFAULT '' COMMENT '登录密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `company` varchar(255) NOT NULL COMMENT '公司名称',
  `telephone` varchar(30) DEFAULT NULL COMMENT '联系方式',
  `is_admin` char(1) DEFAULT '0' COMMENT '是否拥有管理员权限',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `register_time` datetime DEFAULT NULL COMMENT '用户注册时间',
  `last_sign_in_time` datetime DEFAULT NULL COMMENT '最后登陆时间',
  `deleted` char(1) NOT NULL DEFAULT '0' COMMENT '删除标志(0-正常,1-删除)',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
