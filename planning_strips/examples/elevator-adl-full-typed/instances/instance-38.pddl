


(define (problem mixed-f16-p8-u20-v5-g5-a60-n10-A20-B80-N50-F5-r2)
   (:domain miconic)
   (:objects p5 - passenger
             p3 - going_down
             p0 - conflict_A
             p4 p2 p1 p6 p7 p3 - conflict_B
             f0 f1 f2 f3 f4 f5 f6 f7 f8 f9 
             f10 f11 f12 f13 f14 f15 - floor)


(:init
(above f0 f1)
(above f0 f2)
(above f0 f3)
(above f0 f4)
(above f0 f5)
(above f0 f6)
(above f0 f7)
(above f0 f8)
(above f0 f9)
(above f0 f10)
(above f0 f11)
(above f0 f12)
(above f0 f13)
(above f0 f14)
(above f0 f15)

(above f1 f2)
(above f1 f3)
(above f1 f4)
(above f1 f5)
(above f1 f6)
(above f1 f7)
(above f1 f8)
(above f1 f9)
(above f1 f10)
(above f1 f11)
(above f1 f12)
(above f1 f13)
(above f1 f14)
(above f1 f15)

(above f2 f3)
(above f2 f4)
(above f2 f5)
(above f2 f6)
(above f2 f7)
(above f2 f8)
(above f2 f9)
(above f2 f10)
(above f2 f11)
(above f2 f12)
(above f2 f13)
(above f2 f14)
(above f2 f15)

(above f3 f4)
(above f3 f5)
(above f3 f6)
(above f3 f7)
(above f3 f8)
(above f3 f9)
(above f3 f10)
(above f3 f11)
(above f3 f12)
(above f3 f13)
(above f3 f14)
(above f3 f15)

(above f4 f5)
(above f4 f6)
(above f4 f7)
(above f4 f8)
(above f4 f9)
(above f4 f10)
(above f4 f11)
(above f4 f12)
(above f4 f13)
(above f4 f14)
(above f4 f15)

(above f5 f6)
(above f5 f7)
(above f5 f8)
(above f5 f9)
(above f5 f10)
(above f5 f11)
(above f5 f12)
(above f5 f13)
(above f5 f14)
(above f5 f15)

(above f6 f7)
(above f6 f8)
(above f6 f9)
(above f6 f10)
(above f6 f11)
(above f6 f12)
(above f6 f13)
(above f6 f14)
(above f6 f15)

(above f7 f8)
(above f7 f9)
(above f7 f10)
(above f7 f11)
(above f7 f12)
(above f7 f13)
(above f7 f14)
(above f7 f15)

(above f8 f9)
(above f8 f10)
(above f8 f11)
(above f8 f12)
(above f8 f13)
(above f8 f14)
(above f8 f15)

(above f9 f10)
(above f9 f11)
(above f9 f12)
(above f9 f13)
(above f9 f14)
(above f9 f15)

(above f10 f11)
(above f10 f12)
(above f10 f13)
(above f10 f14)
(above f10 f15)

(above f11 f12)
(above f11 f13)
(above f11 f14)
(above f11 f15)

(above f12 f13)
(above f12 f14)
(above f12 f15)

(above f13 f14)
(above f13 f15)

(above f14 f15)



(origin p0 f15)
(destin p0 f2)

(origin p1 f2)
(destin p1 f14)

(origin p2 f9)
(destin p2 f15)

(origin p3 f12)
(destin p3 f8)

(origin p4 f9)
(destin p4 f0)

(origin p5 f8)
(destin p5 f0)

(origin p6 f1)
(destin p6 f3)

(origin p7 f6)
(destin p7 f14)



(no-access p7 f4)
(no-access p7 f5)
(no-access p7 f12)
(no-access p7 f15)
(no-access p3 f14)
(no-access p6 f5)
(no-access p2 f8)
(no-access p2 f14)



(lift-at f0)
)


(:goal (forall (?p - passenger) (served ?p)))
)


