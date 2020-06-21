'use strict';
const Big = require('big.js');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async ranklist() {
    const { ctx } = this;
    const players = await ctx.service.player.players();
    const infos = await ctx.service.roundPlayerInfo.roundPlayerInfos();
    const rounds = await ctx.service.round.rounds();
    const result = [];
    players.forEach(player => {
      const data = {
        player,
      };
      const currentPlayerInfos = infos.filter(info => info.player_id === player.id);
      data.playNum = currentPlayerInfos.length;
      let max;
      let min;
      let total = new Big(0);
      let totalBalance = new Big(0);
      currentPlayerInfos.forEach(info => {
        const amount = +info.amount;
        if (max === undefined || amount > max) {
          max = amount;
        }
        if (min === undefined || amount < min) {
          min = amount;
        }
        total = total.plus(amount);
        let leverage = 0.1;
        const round = rounds.find(r => r.id === info.round_id);
        if (round) {
          leverage = round.leverage;
        }
        totalBalance = totalBalance.plus(new Big(leverage).times(amount));
      });
      data.max = max;
      data.min = min;
      data.total = total.valueOf();
      data.totalBalance = totalBalance.valueOf();
      result.push(data);
    });
    result.sort((a, b) => b.totalBalance - a.totalBalance);
    ctx.status = 200;
    ctx.body = {
      data: result,
    };
  }
}

module.exports = HomeController;
