"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = require("lodash/fp/object");
var PriorityQueue = require("fastpriorityqueue");
var Node = /** @class */ (function () {
    function Node(parent, cost, state, action) {
        this.cost = cost;
        this.parent = parent;
        this.state = object_1.merge({}, state);
        this.key = action ? action.key : null;
        this.action = action;
    }
    return Node;
}());
var mapActions = function (actions) {
    actions = object_1.merge({}, actions);
    return Object.keys(actions).map(function (key) {
        return __assign({}, actions[key], { key: key });
    });
};
var buildGraph = function (parent, leaves, actions, goal) {
    actions.forEach(function (action) {
        if (action.condition(parent.state)) {
            var nextState = action.effect(object_1.merge({}, parent.state));
            var cost = parent.cost + action.cost(nextState);
            var node = new Node(parent, cost, nextState, action);
            if (goal.validate(parent.state, nextState)) {
                leaves.add(node);
            }
            else {
                var subset = actions.filter(function (a) { return a.key !== action.key; });
                return buildGraph(node, leaves, subset, goal);
            }
        }
    });
    return leaves;
};
var getPlanFromLeaf = function (node, goal) {
    var plan = [];
    var cost = node.cost;
    while (node) {
        if (node.action)
            plan.unshift(node.action);
        node = node.parent;
    }
    return {
        cost: cost,
        goal: goal,
        actions: plan.map(function (n) { return n.key; })
    };
};
exports.createPlan = function (state, actions, goal) {
    var root = new Node(null, 0, state, null);
    var leaves = PriorityQueue();
    leaves.defaultcomparator = function (a, b) { return a.cost < b.cost; };
    buildGraph(root, leaves, mapActions(actions), goal);
    if (!leaves.isEmpty())
        return getPlanFromLeaf(leaves.poll(), goal);
    return null;
};
