;; STRIPS Instance problem for the Air cargo transport
;; Use breadth-first search.
;; http://www.inf.unibz.it/~tessaris/teaching/AI_06-07/labs/2007-01-10/planning.html
;;
;; Begin plan
;; (load c1 p1 sfo)
;; (load c2 p2 jfk)
;; (fly p1 sfo jfk)
;; (fly p2 jfk sfo)
;; (unload c2 p2 sfo)
;; (unload c1 p1 jfk)
;; End plan

(define (problem pb1)
  (:domain air-cargo)
  (:objects C1 C2
        P1 P2
        SFO JFK)
  (:init
   ;; types
   (Cargo C1) (Cargo C2)
   (Plane P1) (Plane P2)
   (Airport SFO) (Airport JFK)

   ;; locations
   (At C1 SFO) (At C2 JFK) (At P1 SFO) (At P2 JFK))

  (:goal
   (and (At C1 JFK) (At C2 SFO))))