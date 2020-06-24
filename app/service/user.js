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
    const user = await this.ctx.app.mysql.query(
      'select * from user where phone_number = ?',
      phoneNumber
    );
    if (user.length < 1) {
      this.ctx.status = 400;
      this.ctx.body = {
        message: 'phone number or password error',
        status: 1001,
      };
      // await this.register(phoneNumber, password);
    } else {
      if (user[0].password === password) {
        this.ctx.body = {
          data: {
            phoneNumber: user[0].phone_number,
          },
        };
        this.ctx.status = 200;
      } else {
        this.ctx.status = 400;
        this.ctx.body = {
          message: 'phone number or password error',
          status: 1001,
        };
      }
    }
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
