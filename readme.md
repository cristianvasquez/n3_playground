# Examples

## Path finding

Given an initial state and state transitions, find paths within limits

In the example we go from Brussels to Oostende, with the possibility of buying an icecream. 

```graphviz
digraph finite_state_machine {
    rankdir=LR;
    size="8,5"

    node [shape = circle ]; Brussels
    node [shape = circle ]; Ghent
    node [shape = circle ]; Brugge
    node [shape = circle ]; Oostende

    Brussels -> Ghent [ label = "11" ];
    Ghent  -> Brugge [ label = "10" ];
    Brugge  -> Oostende  [ label = "15" ];
    Ghent  -> Oostende [ label = "3" ];
    Brussels  -> Oostende [ label = "70" ];
    Brugge  -> Brugge [ label = "Buy an ice cream" ];

}
```

```sh
>/opt/eye/bin/eye.sh --nope --n3 gps-plugin.n3 map.n3 state.n3 --query query.n3 

EYE v18.0117.1550 josd
SWI-Prolog 7.6.4 (amd64): , 16:54
starting 37 [msec cputime] 44 [msec walltime]
#Processed by EYE v18.0117.1550 josd
#eye --nope --n3 gps-plugin.n3 map.n3 state.n3 --query query.n3

GET file:///home/cvasquez/github.com/cristianvasquez/n3_playground/gps-plugin.n3 SC=7
GET file:///home/cvasquez/github.com/cristianvasquez/n3_playground/map.n3 SC=13
GET file:///home/cvasquez/github.com/cristianvasquez/n3_playground/state.n3 SC=2
GET file:///home/cvasquez/github.com/cristianvasquez/n3_playground/query.n3 SC=1
networking 9 [msec cputime] 10 [msec walltime]
PREFIX math: <http://www.w3.org/2000/10/swap/math#>
PREFIX list: <http://www.w3.org/2000/10/swap/list#>
PREFIX log: <http://www.w3.org/2000/10/swap/log#>
PREFIX e: <http://eulersharp.sourceforge.net/2003/03swap/log-rules#>
PREFIX gps: <http://josd.github.io/fluid/gps/gps-schema#>
PREFIX : <http://josd.github.io/fluid#>
PREFIX ex: <http://example.org#>

:i1 ex:hasPath ((:drive_Brussels_Oostende) 70.0 0.005 1.0).
:i1 ex:hasPath ((:drive_Brussels_Ghent :drive_Ghent_Brugge :buy_an_icecream :drive_Brugge_Oostende) 106.0 0.02 1.0).
:i1 ex:hasPath ((:drive_Brussels_Ghent :drive_Ghent_Brugge :drive_Brugge_Oostende) 36.0 0.015 1.0).
:i1 ex:hasPath ((:drive_Brussels_Ghent :drive_Ghent_Oostende) 14.0 0.01 1.0).

reasoning 1 [msec cputime] 1 [msec walltime]
#2018-06-28T18:08:21.307Z in=23 out=4 ent=4 step=4 brake=2 inf=93095 sec=0.047 inf/sec=1980745
#ENDS

2018-06-28T18:08:21.307Z in=23 out=4 ent=4 step=4 brake=2 inf=93095 sec=0.047 inf/sec=1980745
```


## Credit

Fluid, by Jos

http://josd.github.io/fluid/gps

------------------------------
Goal driven Parallel Sequences
------------------------------

Inspired by https://www.cs.cmu.edu/~fp/courses/15816-s12/lectures/01-inference.pdf

In linear logic we are instead concerned with the change of truth with a
change of state. We model this in a very simple way: when an inference rule
is applied we consume the propositions used as premises and produce the
propositions in the conclusions, thereby effecting an overall change in state.