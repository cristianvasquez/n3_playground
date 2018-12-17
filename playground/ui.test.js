"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var planner_1 = require("../planning_javascript/planner");
var ui = require("../planning_javascript/ui");
var logPlan = function (plan) {
    if (!plan)
        return;
    console.log("-- Best plan(" + plan.cost + ") for " + plan.goal.label + " --");
    plan.actions.map(function (a, i) { return console.log(i + 1 + ") " + a); });
};

it("can change address", function () {
    var plan = planner_1.createPlan(ui.initialState, ui.actions, ui.goals.address_updated);
    expect(plan).toBeTruthy();
    logPlan(plan);
});
