'use strict';

const Service = require('egg').Service;

class RoundPlayerInfoService extends Service {
  async roundPlayerInfos() {
    return await this.ctx.app.mysql.select('round_player_info');
  }

  async roundPlayerInfo({ roundId }) {
    const infos = await this.ctx.app.mysql.select('round_player_info', {
      where: { round_id: roundId },
    });
    this.ctx.status = 200;
    this.ctx.body = {
      data: infos,
    };
  }

  async addRoundPlayerInfo(infos) {
    infos = infos.map(info => {
      return {
        player_id: info.playerId,
        round_id: info.roundId,
        amount: info.amount,
      };
    });
    const result = await this.ctx.app.mysql.insert('round_player_info', infos);
    if (result.affectedRows > 0) {
      return {
        status: 200,
        data: {
          id: result.insertId,
        },
      };
    }
  }

  async update(infos) {
    return await this.ctx.app.mysql.updateRows('round_player_info', infos);
  }
}

module.exports = RoundPlayerInfoService;
