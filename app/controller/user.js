'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    await ctx.service.user.loginOrRegister(ctx.request.body);
  }
}

module.exports = UserController;
