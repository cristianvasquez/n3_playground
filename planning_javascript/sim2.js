"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = {
    player: {
        weapon_equipped: false,
        bullets: 0,
        clips: 1
    },
    enemy: {
        visible: false,
        alive: true
    }
};
exports.actions = {
    equipWeapon: {
        condition: function (s) { return !s.player.weapon_equipped; },
        effect: function (s) {
            s.player.weapon_equipped = true;
            return s;
        },
        cost: function (s) { return 2; }
    },
    reload: {
        condition: function (s) { return s.player.weapon_equipped && s.player.clips > 0; },
        effect: function (s) {
            s.player.bullets += 6;
            return s;
        },
        cost: function (s) { return 2; }
    },
    fire: {
        condition: function (s) {
            return s.enemy.visible === true &&
                s.player.weapon_equipped &&
                s.player.bullets > 0;
        },
        effect: function (s) {
            s.player.bullets--;
            s.enemy.alive = false;
            return s;
        },
        cost: function (s) { return 2; }
    },
    useTurret: {
        condition: function (s) { return s.enemy.visible; },
        effect: function (s) {
            s.enemy.alive = false;
            return s;
        },
        cost: function (s) { return 10; }
    },
    knifeAttack: {
        condition: function (s) { return s.enemy.visible; },
        effect: function (s) {
            s.enemy.alive = false;
            return s;
        },
        cost: function (s) { return 12; }
    },
    scout: {
        condition: function (s) { return !s.enemy.visible; },
        effect: function (s) {
            s.enemy.visible = true;
            return s;
        },
        cost: function (s) { return 1; }
    },
    hide: {
        condition: function (s) { return true; },
        effect: function (s) {
            s.enemy.visible = false;
            return s;
        },
        cost: function (s) { return 1; }
    }
};
exports.goals = {
    killEnemy: {
        label: "Kill Enemy",
        validate: function (prevState, nextState) {
            return nextState.enemy.alive === false;
        }
    },
    hide: {
        label: "Hide",
        validate: function (prev, next) {
            return next.enemy.visible === false;
        }
    }
};
