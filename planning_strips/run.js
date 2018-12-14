const StripsManager = require('strips');
const pddl2n3 = require('./pddl2n3');

let problem = 'block';

StripsManager.loadProblem('./'+problem+'/problem.pddl', function (parsed) {
    console.log(pddl2n3.getState(parsed));
    console.log(pddl2n3.getQuery(parsed));
});


StripsManager.loadDomain('./'+problem+'/domain.pddl', function (parsed) {
    console.log(pddl2n3.getTransitionMap(parsed));
});


