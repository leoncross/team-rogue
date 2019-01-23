describe('Combat',function(){

  beforeEach(function() {
    function DiceStub() {}
    DiceStub.prototype = {
      rollDice() {},
      rollBetween() {}
    };
    var Combat = require('../src/Combat');
    dice = new DiceStub
    combat = new Combat(dice)

    hero = {name: 'leon', health: 100, armor: 5, armorName: 'Plate', weaponName: 'Dagger', weaponMin: 3, weaponMax: 5, strength: 3, dexterity: 3}
    monster = {name: 'luca', health: 100, armor: 4, armorName: 'Leather', weaponName: 'Long Sword', weaponMin: 5, weaponMax: 8, strength: 4, dexterity: 4}
    leonDeadPlayer = {name: 'leon', health: 0, armor: 5, armorName: 'Plate', weaponName: 'Dagger', weaponMin: 3, weaponMax: 5, strength: 3, dexterity: 3}

  });

  describe("#attackSetup", function() {
    it("returns player and monster", function() {
      expect(combat.attackSetup([hero, monster])).toEqual([hero, monster])
    });
    it("hero is hero", function() {
      combat.attackSetup([hero, monster])
      expect(combat.hero).toEqual(hero)
    });
    it("monster is monster", function() {
      combat.attackSetup([hero, monster])
      expect(combat.monster).toEqual(monster)
    });
  });

  describe("#attackSquence", function() {
    it("runs through monster and player attacks if player healthy", function() {
      spyOn(dice, "rollDice").and.returnValue(15);
      spyOn(dice, "rollBetween").and.returnValue(5);
      combat.attackSetup([hero, monster])
      expect(combat.attackSequence()).toEqual([8, 9])
    })
    it("player is dead, fails to make further attacks", function() {
      spyOn(dice, "rollDice").and.returnValue(15);
      spyOn(dice, "rollBetween").and.returnValue(5);
      combat.attackSetup([leonDeadPlayer, monster])
      expect(combat.attackSequence()).toEqual('you have died')
    })
  })
  describe("#heroAttack", function() {
    it("success - monster loses health with dice roll", function() {
      spyOn(dice, "rollDice").and.returnValue(15);
      spyOn(dice, "rollBetween").and.returnValue(5);
      combat.attackSetup([hero, monster])
      expect(combat.heroAttack()).toEqual(8)
      expect(combat.monster["health"]).toEqual(92)
    });
    it("miss - player misses dice roll, no health lost", function() {
      spyOn(dice, "rollDice").and.returnValue(1);
      combat.attackSetup([hero, monster])
      expect(combat.heroAttack()).toEqual("miss")
      expect(combat.monster["health"]).toEqual(100)
    });
  });
  describe("#monsterAttack", function() {
    it("success - player loses health with dice roll", function() {
      spyOn(dice, "rollDice").and.returnValue(15);
      spyOn(dice, "rollBetween").and.returnValue(5);
      combat.attackSetup([hero, monster])
      expect(combat.monsterAttack()).toEqual(9)
      expect(combat.hero["health"]).toEqual(91)
    });
    it("miss - monster misses dice roll, no health lost", function() {
      spyOn(dice, "rollDice").and.returnValue(3);
      combat.attackSetup([hero, monster])
      expect(combat.monsterAttack()).toEqual("miss")
      expect(combat.hero["health"]).toEqual(100)
    });
  });
  describe("#diceRoll", function() {
    it("returns a dice roll", function() {
      spyOn(dice, "rollDice").and.returnValue(9);
      expect(combat.diceRoll()).toEqual(9)
    });
  });
  describe("#weaponDamage", function() {
    it("returns a number between the weaponDamage", function() {
      spyOn(dice, "rollBetween").and.returnValue(5);
      combat.attackSetup([hero, monster])
      expect(combat.weaponDamage(hero)).toEqual(5)
    });
  });
  describe("#healthChecker", function() {
    it("returns true for player being full health", function() {
      combat.attackSetup([hero, monster])
      expect(combat.healthChecker()).toEqual(true)
    });
    it("returns false for player being dead", function() {
      combat.attackSetup([leonDeadPlayer, monster])
      expect(combat.healthChecker()).toEqual(false)
    });
  });
});
