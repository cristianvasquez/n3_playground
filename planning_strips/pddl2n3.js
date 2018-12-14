const StripsManager = require('strips');
var Handlebars = require('handlebars');
var helpers = require('handlebars-helpers')({
    handlebars: Handlebars
});

const transitionV1 = Handlebars.compile(
`
:this ex:domain "{{domain}}" ;
{{#requirements}}ex:requirement "{{this}}" .{{/requirements}} 
{{#actions}}

:{{action}} a :Action
## Preconditions
{{#precondition}}{{#is operation 'not'}}#Not in state{{/is}}{{#is operation 'and'}}#In state{{/is}}
{{#equalsLength parameters 0}}#ERROR 0{{/equalsLength}}{{#equalsLength parameters 1}}?{{itemAt parameters 0}} a :{{action}} .{{/equalsLength}}{{#equalsLength parameters 2}}?{{itemAt parameters 0}} :{{action}} ?{{itemAt parameters 1}} .{{/equalsLength}}{{#equalsLength parameters 3}}#ERROR 3{{/equalsLength}}{{/precondition}}
## Effects
{{#effect}}
{{#is operation 'not'}}# To remove{{/is}}{{#is operation 'and'}}# To add{{/is}}
{{#equalsLength parameters 0}}#ERROR 0{{/equalsLength}}{{#equalsLength parameters 1}}?{{itemAt parameters 0}} a :{{action}} .{{/equalsLength}}{{#equalsLength parameters 2}}?{{itemAt parameters 0}} :{{action}} ?{{itemAt parameters 1}} .{{/equalsLength}}{{#equalsLength parameters 3}}#ERROR 3{{/equalsLength}}
{{/effect}}{{/actions}}`
);

/**
Generates things like this:

{
:map-BE gps:description (
    {?S :location :Ghent}
    true
    {?S :location :Oostende}
:drive_Ghent_Oostende
    3.0
    0.005
    0.98
    1.0)
} <= true.
**/

const getTransitionMap = Handlebars.compile(
`
PREFIX math: <http://www.w3.org/2000/10/swap/math#>
PREFIX gps: <http://josd.github.io/fluid/gps/gps-schema#>
PREFIX : <http://josd.github.io/fluid#>
PREFIX ex: <http://example.org#>

:this ex:domain "{{domain}}" ;
{{#requirements}}ex:requirement "{{this}}" .{{/requirements}} 
{{#actions}}

# Description of '{{action}}'
{
{{#precondition}}{{#is operation 'not'}}\n# negation (not implemented){{/is}}{{#is operation 'and'}}# the preconditions{{/is}}
    {{#equalsLength parameters 0}}#ERROR 0{{/equalsLength}}{{#equalsLength parameters 1}}?{{itemAt parameters 0}} a :{{action}} .{{/equalsLength}}{{#equalsLength parameters 2}}?{{itemAt parameters 0}} :{{action}} ?{{itemAt parameters 1}} .{{/equalsLength}}{{#equalsLength parameters 3}}#ERROR 3{{/equalsLength}}{{/precondition}}
} => { :this gps:description ( {
# to add
    {{#effect}}{{#is operation 'and'}}{{#equalsLength parameters 0}}#ERROR 0{{/equalsLength}}{{#equalsLength parameters 1}}?{{itemAt parameters 0}} a :{{action}} .{{/equalsLength}}{{#equalsLength parameters 2}}?{{itemAt parameters 0}} :{{action}} ?{{itemAt parameters 1}} .{{/equalsLength}}{{#equalsLength parameters 3}}#ERROR 3{{/equalsLength}}{{/is}}{{/effect}}
} true {
# to remove
    {{#effect}}{{#is operation 'not'}}{{#equalsLength parameters 0}}#ERROR 0{{/equalsLength}}{{#equalsLength parameters 1}}?{{itemAt parameters 0}} a :{{action}} .{{/equalsLength}}{{#equalsLength parameters 2}}?{{itemAt parameters 0}} :{{action}} ?{{itemAt parameters 1}} .{{/equalsLength}}{{#equalsLength parameters 3}}#ERROR 3{{/equalsLength}}{{/is}}{{/effect}}
}
:{{action}} 
    1 # Duration
    1 # Cost
    1 # SuccessRate
    1 # Happiness
)}

{{/actions}}
`
);


const getState = Handlebars.compile(
    `
PREFIX math: <http://www.w3.org/2000/10/swap/math#>
PREFIX gps: <http://josd.github.io/fluid/gps/gps-schema#>
PREFIX : <http://josd.github.io/fluid#>
PREFIX ex: <http://example.org#>

:this ex:domain "{{domain}}" ;
{{#requirements}}ex:requirement "{{this}}" .{{/requirements}} 

{{#states}}
{{#is name 'init'}}
# initial state
{{#actions}}
{{#is operation 'and'}}# to add{{/is}}{{#is operation 'not'}}# to remove{{/is}}
{{#equalsLength parameters 0}}#ERROR 0{{/equalsLength}}{{#equalsLength parameters 1}}:{{itemAt parameters 0}} a :{{action}} .{{/equalsLength}}{{#equalsLength parameters 2}}:{{itemAt parameters 0}} :{{action}} :{{itemAt parameters 1}} .{{/equalsLength}}{{#equalsLength parameters 3}}#ERROR 3{{/equalsLength}}
{{/actions}}
{{/is}}
{{/states}}
`
);

const getQuery = Handlebars.compile(
    `
{{#states}}
{{#is name 'goal'}}
{
	?SCOPE gps:findpath (
			{
# the goal
{{#actions}}
{{#is operation 'and'}}# to add{{/is}}{{#is operation 'not'}}# to remove{{/is}}
{{#equalsLength parameters 0}}#ERROR 0{{/equalsLength}}{{#equalsLength parameters 1}}:{{itemAt parameters 0}} a :{{action}} .{{/equalsLength}}{{#equalsLength parameters 2}}:{{itemAt parameters 0}} :{{action}} :{{itemAt parameters 1}} .{{/equalsLength}}{{#equalsLength parameters 3}}#ERROR 3{{/equalsLength}}
{{/actions}}

			}
			?path
			?duration
			?cost
			?successRate
			?happiness (
			    3600.0  # maximum duration
			    5.0     # maximum cost
			    0.2     # minimum success Rate
			    1       # minimum happiness
			    2       # max stage count
			)
		).
} => {
	?SUBJECT ex:hasPath (
	                        ?path
	                        ?duration
	                        ?cost
	                        ?happiness
	                        ?successRate
	                    ) .
}.
{{/is}}
{{/states}}

`
);

let problem = 'air-cargo';

StripsManager.loadProblem('./'+problem+'/problem.pddl', function (parsed) {
    console.log(getState(parsed));
    // console.log(getQuery(parsed));
});


//
// StripsManager.loadDomain('./'+problem+'/domain.pddl', function (parsed) {
//     console.log(getTransitionMap(parsed));
// });

