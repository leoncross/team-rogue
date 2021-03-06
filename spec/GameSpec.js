
describe('Game', function(){


  var Player = require('../src/Player');
  var Loot = require('../src/Loot');
  var Monster = require('../src/Monster');
  var Dice = require('../src/Dice');
  var Combat = require('../src/Combat');
  var Rooms = require('../src/Rooms');
  //
  var Readout = require('../src/Readout');
  // var sinon = require('sinon');
  var Game = require('../src/Game');

  var player
  // var playerName
  var loot
  var monster
  var combat
  var dice
  // var stub
  var room
  var readout
  var game;

  beforeEach(function () {
    player = new Player();
    // playerName = 'Player'
    hero = player.returnHero()
    monster = new Monster()
    dice = new Dice()
    // stub = sinon.stub(Math, 'floor')
    readout = new Readout()
    loot = new Loot(player, readout)
    combat = new Combat(player, monster, dice, readout)
    room = new Rooms(player, monster, combat, dice)
    game = new Game();
  });

  describe('initialize', function(){
    it('the object to exist', function(){
      expect(loot).toBeDefined();
    });

    it('the object to exist', function(){
      expect(player).toBeDefined();
    });

    it('the object to exist', function(){
      expect(monster).toBeDefined();
    });

    it('the object to exist', function(){
      expect(combat).toBeDefined();
    });

    it('the object to exist', function(){
      expect(dice).toBeDefined();
    });

    it('the object to exist', function(){
      expect(room).toBeDefined();
    });

    it('the object to exist', function(){
      expect(game).toBeDefined();
    });
  });
});
