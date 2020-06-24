'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // user
  router.post('/login', controller.user.login);
  // player
  router.post('/players', controller.player.players);
  router.post('/addPlayer', controller.player.addPlayer);
  // round
  router.post('/addRound', controller.round.addRound);
  router.post('/rounds', controller.round.rounds);
  router.post('/roundDetails', controller.round.roundDetails);
  router.post('/updateRound', controller.round.updateRound);

  router.post('/ranklist', controller.home.ranklist);
};
