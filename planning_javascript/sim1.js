"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = {
    axe_available: true,
    player: {
        axe_equipped: false,
        wood: 0
    }
};
exports.actions = {
    chopWood: {
        condition: function (s) { return s.player.axe_equipped; },
        effect: function (s) {
            s.player.wood++;
            return s;
        },
        cost: function (s) { return 2; }
    },
    getAxe: {
        condition: function (s) { return !s.player.axe_equipped && s.axe_available; },
        effect: function (s) {
            s.player.axe_equipped = true;
            return s;
        },
        cost: function (s) { return 2; }
    },
    gatherWood: {
        condition: function (s) { return true; },
        effect: function (s) {
            s.player.wood++;
            return s;
        },
        cost: function (s) { return 5; }
    }
};
exports.goals = {
    collectWood: {
        label: "Collect Wood",
        validate: function (prevState, nextState) {
            return nextState.player.wood > prevState.player.wood;
        }
    }
};
