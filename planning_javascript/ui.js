"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = {
    user: {
        logged_in: false,
        moving_to: 'new_address'
    },
    commune: {
        known_address: 'old_address'
    },
    police: {
        needs_check_address: false,
        says_address_ok: false
    }
};
exports.goals = {
    address_updated: {
        label: "Address updated",
        validate: function (prevState, nextState) {
            return nextState.commune.known_address === 'new_address';
        }
    }
};
exports.actions = {
    user_log_in_via_its_me: {
        condition: function (s) { return !s.user.logged_in; },
        effect: function (s) {
            s.user.logged_in = true;
            return s;
        },
        cost: function (s) { return 1; }
    },
    user_log_in_via_card: {
        condition: function (s) { return !s.user.logged_in; },
        effect: function (s) {
            s.user.logged_in = true;
            return s;
        },
        cost: function (s) { return 2; }
    },
    user_notify_address_change: {
        condition: function (s) { return s.user.logged_in
            && s.police.needs_check_address == false; },
        effect: function (s) {
            s.police.needs_check_address = true;
            return s;
        },
        cost: function (s) { return 1; }
    },
    police_checks_address: {
        condition: function (s) { return s.police.needs_check_address; },
        effect: function (s) {
            s.police.needs_check_address = false;
            s.police.says_address_ok = true;
            return s;
        },
        cost: function (s) { return 1; }
    },
    commune_updates_address: {
        condition: function (s) { return s.police.says_address_ok; },
        effect: function (s) {
            s.police.says_address_ok = false;
            s.commune.known_address = 'new_address';
            return s;
        },
        cost: function (s) { return 1; }
    },
};
