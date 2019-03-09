'use strict';

module.exports = {
  //执行数据库升级时调用的函数，创建user表
  up: async(queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: {
        type: STRING(36), 
        primaryKey:true, 
        autoIncrement: false
      },
      login_name: STRING(30), 
      pass: STRING(100),
      avatar: STRING(255),
      company: STRING(255),
      telephone: STRING(30),
      create_time: DATE, 
      update_time: DATE,
      register_time: DATE,
      is_admin: INTEGER,
      deleted: INTEGER,
      last_sign_in_time: DATE,
      delete_time: DATE,
    });
  },
  //执行数据库降级时调用的函数,删除user表
  down: async(queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('users')
  },
};
