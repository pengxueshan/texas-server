'use strict';

const Service = require('egg').Service;
const { encrypt } = require('../utils/helper');

class UserService extends Service {
  async loginOrRegister({ phoneNumber, password }) {
    if (!phoneNumber || !password) {
      this.ctx.status = 400;
      this.ctx.body = {
        message: 'bad request',
      };
      return;
    }
    return await this.ctx.app.mysql.query(
      'select * from user where phone_number = ?',
      phoneNumber
    );
  }

  async register(phoneNumber, password) {
    password = encrypt('md5', password);
    const result = await this.ctx.app.mysql.insert('user', {
      phone_number: phoneNumber,
      password,
    });
    if (result.affectedRows === 1) {
      this.ctx.status = 200;
      this.ctx.body = {
        phone_number: phoneNumber,
      };
    }
  }
}

module.exports = UserService;
