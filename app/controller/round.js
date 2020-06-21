'use strict';

const Controller = require('egg').Controller;

class RoundController extends Controller {
  async addRound() {
    const { ctx } = this;
    const reqData = ctx.request.body;
    const { leverage, date, playerInfo } = reqData;
    const addRoundResult = await ctx.service.round.addRound({ date, leverage });
    if (addRoundResult.status === 200) {
      const addRoundPlayerInfoResult = await ctx.service.roundPlayerInfo.addRoundPlayerInfo(
        playerInfo.map(info => {
          return {
            roundId: addRoundResult.data.id,
            playerId: info.id,
            amount: info.amount,
          };
        })
      );
      ctx.status = addRoundPlayerInfoResult.status;
      ctx.body = {
        data: addRoundPlayerInfoResult.data,
      };
    }
  }

  async rounds() {
    const { ctx } = this;
    const rounds = await ctx.service.round.rounds();
    ctx.status = 200;
    ctx.body = {
      data: rounds,
    };
  }

  async roundDetails() {
    const { ctx } = this;
    const rounds = await ctx.service.round.rounds();
    const infos = await ctx.service.roundPlayerInfo.roundPlayerInfos();
    
    ctx.status = 200;
    ctx.body = {
      data: rounds,
    };
  }
}

module.exports = RoundController;
