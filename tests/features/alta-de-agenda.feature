# language: es
Característica: Registro de un usuario
  Como administrador,
  quiero dar de alta una agenda,
  para que los clientes puedan reservar citas.

  Regla: El administrador debe estar autenticado para dar de alta una agenda
    Escenario: AA1: Alta exitosa de una agenda por un administrador autenticado
        Dado que el administrador está autenticado
        Cuando intento crear una agenda con los siguientes datos:
        | nombre          | Agenda matutina |
        | duracion_turno  | 60              |
        Y con la siguiente disponibilidad:
        | dia       | inicio | fin   |
        | LUNES     | 09:00  | 13:00 |
        | MARTES    | 09:00  | 13:00 |
        | MIERCOLES | 09:00  | 13:00 |
        | JUEVES    | 09:00  | 13:00 |
        | VIERNES   | 09:00  | 13:00 |
        Entonces el alta de la agenda debe ser exitosa
    
    @wip
    Escenario: AA2: Alta fallida de una agenda por un administrador no autenticado
        Dado que el administrador no está autenticado
        Cuando intento crear una agenda con los siguientes datos:
        | nombre          | Agenda vespertina |
        | duracion_turno  | 30                |
        Y con la siguiente disponibilidad:
        | dia       | inicio | fin   |
        | LUNES     | 14:00  | 18:00 |
        | MARTES    | 14:00  | 18:00 |
        | MIERCOLES | 14:00  | 18:00 |
        | JUEVES    | 14:00  | 18:00 |
        | VIERNES   | 14:00  | 18:00 |
        Entonces el alta de la agenda debe fallar con No estas autenticado para crear una agenda.