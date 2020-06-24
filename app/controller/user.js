'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { password } = ctx.request.body;
    const user = await ctx.service.user.loginOrRegister(ctx.request.body);
    if (user.length < 1) {
      ctx.status = 400;
      ctx.body = {
        message: 'phone number or password error',
        status: 1001,
      };
    } else {
      if (user[0].password === password) {
        ctx.session.phoneNumber = user[0].phone_number;
        ctx.body = {
          data: {
            phoneNumber: user[0].phone_number,
          },
        };
        ctx.status = 200;
      } else {
        ctx.status = 400;
        ctx.body = {
          message: 'phone number or password error',
          status: 1001,
        };
      }
    }
  }
}

module.exports = UserController;
