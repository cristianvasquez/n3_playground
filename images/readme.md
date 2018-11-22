## Brussels to Oostende

```graphviz
digraph finite_state_machine {
    rankdir=LR;
    size="8,5"

    node [shape = circle ]; Brussels
    node [shape = circle ]; Ghent
    node [shape = circle ]; Brugge
    node [shape = circle ]; Oostende

    Brussels -> Ghent [ label = "(11)" ];
    Ghent  -> Brugge [ label = "(10)" ];
    Brugge  -> Oostende  [ label = "(15)" ];
    Ghent  -> Oostende [ label = "(3)" ];
    Brussels  -> Oostende [ label = "(70)" ];
    Brugge  -> Brugge [ label = "Buy an ice cream (70)" ];
}
```s