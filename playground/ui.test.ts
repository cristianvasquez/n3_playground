import { createPlan } from "../planning_javascript/planner";
import * as ui from "../planning_javascript/ui"

const logPlan = (plan)=> {
    if (!plan)
        return;
    console.log(`-- Best plan(${plan.cost}) for ${plan.goal.label} --`);
    plan.actions.map( (a,i)=> console.log(`${i+1}) ${a}`) )
};

it("can change address", () => {
    const plan = createPlan(ui.initialState, ui.actions, ui.goals.address_updated);
    expect(plan).toBeTruthy();
    logPlan(plan);
});
