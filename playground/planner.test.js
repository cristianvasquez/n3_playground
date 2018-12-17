"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var planner_1 = require("../planning_javascript/planner");
var sim1 = require("../planning_javascript/sim1");
var sim2 = require("../planning_javascript/sim2");
var logPlan = function (plan) {
    if (!plan)
        return;
    console.log("-- Best plan(" + plan.cost + ") for " + plan.goal.label + " --");
    plan.actions.map(function (a, i) { return console.log(i + 1 + ") " + a); });
};
it("can plan actions", function () {
    var plan = planner_1.createPlan(sim1.initialState, sim1.actions, sim1.goals.collectWood);
    expect(plan).toBeTruthy();
    logPlan(plan);
    var plan2 = planner_1.createPlan(sim2.initialState, sim2.actions, sim2.goals.killEnemy);
    expect(plan2).toBeTruthy();
    logPlan(plan2);
    var hideState = sim2.initialState;
    hideState.enemy.visible = true;
    var plan3 = planner_1.createPlan(hideState, sim2.actions, sim2.goals.hide);
    expect(plan3).toBeTruthy();
    logPlan(plan3);
});
