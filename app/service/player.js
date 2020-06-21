'use strict';

const Service = require('egg').Service;

class PlayerService extends Service {
  async players() {
    const results = await this.ctx.app.mysql.select('player');
    return results;
  }

  async addPlayer(name) {
    if (!name) {
      return {
        status: 400,
        message: 'player name can not be empty',
      };
    }

    const result = await this.ctx.app.mysql.insert('player', { name });
    if (result.affectedRows === 1) {
      return {
        status: 200,
        data: {
          id: result.insertId,
        },
      };
    }
  }
}

module.exports = PlayerService;
