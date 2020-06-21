'use strict';

const Service = require('egg').Service;

class RoundService extends Service {
  async round(id) {
    return await this.ctx.app.mysql.get('round', { id });
  }

  async rounds() {
    return await this.ctx.app.mysql.select('round');
  }

  async addRound({ date, leverage }) {
    if (!date || !leverage) {
      return {
        status: 400,
        message: 'round date and leverage can not be empty',
      };
    }
    const result = await this.ctx.app.mysql.insert('round', {
      date,
      leverage,
    });
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

module.exports = RoundService;
