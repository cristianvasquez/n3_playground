export const initialState = {
    user: {
        logged_in: false,
        moving_to: 'new_address'
    },
    commune: {
        known_address: 'old_address'
    },
    police: {
        needs_check_address:false,
        says_address_ok:false
    }
};

export const goals = {
    address_updated: {
        label: "Address updated",
        validate: (prevState, nextState) => {
            return nextState.commune.known_address === 'new_address';
        }
    }
};

export const actions = {

    user_log_in_via_its_me: {
        condition: s => !s.user.logged_in,
        effect: s => {
            s.user.logged_in = true;
            return s;
        },
        cost: s => 1
    },

    user_log_in_via_card: {
        condition: s => !s.user.logged_in,
        effect: s => {
            s.user.logged_in = true;
            return s;
        },
        cost: s => 2
    },

    user_notify_address_change: {
        condition: s => s.user.logged_in
            && s.police.needs_check_address == false,
        effect: s => {
            s.police.needs_check_address = true;
            return s;
        },
        cost: s => 1
    },

    police_checks_address: {
        condition: s => s.police.needs_check_address,
        effect: s => {
            s.police.needs_check_address = false;
            s.police.says_address_ok = true;
            return s;
        },
        cost: s => 1
    },

    commune_updates_address: {
        condition: s => s.police.says_address_ok,
        effect: s => {
            s.police.says_address_ok = false;
            s.commune.known_address = 'new_address';
            return s;
        },
        cost: s => 1
    },

};

