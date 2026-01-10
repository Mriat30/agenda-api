# language: es
Característica: Registrar turno para un usuario registrado
  Como cliente,
  quiero registrar un turno ,
  para poder realizarme masajes.

  Antecedentes:
    Dado que ahora es "10-10-2025" a las "10:00"

  Regla: Estar registrado y el turno esta disponible
    @wip
    Escenario: RT1: Un usuario registrado, con turno disponible, reserva un turno exitosamente
      Dado que estoy registrado
      Y que el turno del "15-10-2025" a las "11:00" está disponible
      Cuando intento reservar el turno del "15-10-2025" a las "11:00"
      Entonces el turno se reserva exitosamente

    @wip
    Escenario: RT2: Un usuario registrado, con turno ocupado, no puede reservar un turno
      Dado que estoy registrado
      Y que el turno del "15-10-2025" a las "12:00" está ocupado
      Cuando intento reservar el turno del "15-10-2025" a las "12:00"
      Entonces la reserva del turno falla con Turno no disponible
