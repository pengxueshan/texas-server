'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async players() {
    const { ctx } = this;
    const data = await ctx.service.player.players();
    this.ctx.status = 200;
    this.ctx.body = { data };
  }

  async addPlayer() {
    const { ctx } = this;
    const { name = '' } = ctx.request.body;
    const { status, message, data } = await ctx.service.player.addPlayer(name);
    this.ctx.status = status;
    this.ctx.body = { data, message };
  }
}

module.exports = UserController;
