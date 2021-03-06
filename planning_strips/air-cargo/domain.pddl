;;
;; Air cargo transport problem.
;; http://www.inf.unibz.it/~tessaris/teaching/AI_06-07/labs/2007-01-10/planning.html
;;

(define (domain air-cargo)
  (:requirements :strips)
  (:predicates (In ?obj ?place)
           (At ?obj ?place)
           (Cargo ?obj)
           (Plane ?obj)
           (Airport ?obj))

  (:action LOAD
     :parameters (?c ?p ?a)
     :precondition (and (At ?c ?a) (At ?p ?a)
             (Cargo ?c) (Plane ?p) (Airport ?a))
     :effect (and (In ?c ?p) (not (At ?c ?a))))

  (:action UNLOAD
     :parameters (?c ?p ?a)
     :precondition (and (In ?c ?p) (At ?p ?a)
             (Cargo ?c) (Plane ?p) (Airport ?a))
     :effect (and (At ?c ?a) (not (In ?c ?p))))

  (:action FLY
     :parameters (?p ?from ?to)
     :precondition (and (At ?p ?from)
             (Plane ?p) (Airport ?from) (Airport ?to))
     :effect (and (At ?p ?to) (not (At ?p ?from))))
  )