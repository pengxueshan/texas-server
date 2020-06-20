/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592622172425_8074';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql: {
      client: {
        // host
        host: '106.55.15.36',
        // 端口号
        port: '3306',
        // 用户名
        user: 'texas',
        // 密码
        password: 'Auto@2020',
        // 数据库名
        database: 'texas',
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    security: {
      csrf: {
        enable: false, // 暂时禁用掉 csrf，错误信息：403 missing csrf token
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
