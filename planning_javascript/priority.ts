import PriorityQueue from "fastpriorityqueue";

var x = new PriorityQueue();
x.add(1);
x.add(0);
x.add(5);
x.add(4);
x.add(3);
x.peek(); // should return 0, leaves x unchanged
x.size; // should return 5, leaves x unchanged
while(!x.isEmpty()) {
    console.log(x.poll());
} // will print 0 1 3 4 5