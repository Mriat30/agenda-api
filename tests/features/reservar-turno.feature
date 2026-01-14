# language: es
Característica: Registrar turno para un usuario registrado
  Como cliente,
  quiero registrar un turno ,
  para poder realizarme masajes.

  Antecedentes:
    Dado que ahora es "10-10-2025" a las "10:00"
    Y que existe la agenda de ID "12345"

  Regla: Estar registrado y el turno esta disponible
    Escenario: RT1: Un usuario registrado, con turno disponible, reserva un turno exitosamente
      Dado que estoy registrado
      Y que el turno del "15-10-2025" a las "11:00" está disponible
      Cuando intento reservar el turno del "15-10-2025" a las "11:00" en la agenda de ID "12345"
      Entonces el turno se reserva exitosamente

    Escenario: RT2: Un usuario registrado, con turno ocupado, no puede reservar un turno
      Dado que estoy registrado
      Y que el turno del "15-10-2025" a las "12:00" está ocupado
      Cuando intento reservar el turno del "15-10-2025" a las "12:00" en la agenda de ID "12345"
      Entonces la reserva del turno falla con Turno no disponible

    Escenario: RT3: Un usuario no puede registrar un turno en el pasado
      Dado que estoy registrado
      Cuando intento reservar el turno del "05-10-2025" a las "09:00" en la agenda de ID "12345"
      Entonces la reserva del turno falla con Fecha inválida

    Escenario: RT4: Un usuario no registrado no puede reservar un turno
      Dado que no estoy registrado
      Cuando intento reservar el turno del "15-10-2025" a las "13:00" en la agenda de ID "12345"
      Entonces la reserva del turno falla con Usuario no registrado

    