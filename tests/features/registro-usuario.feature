# language: es
  @wip
  Característica: Registro de un usuario
    Como cliente,
    quiero registrarme en la plataforma de agenda de masajes,
    para poder reservar citas para masajes.

    Escenario RU1: Registro exitoso de un nuevo usuario
      Dado que no existe un usuario registrado con el email "juanperez@gmail.com"
      Cuando registro un usuario con nombre "Juan", teléfono "1234567890" y email "juanperez@gmail.com"
      Entonces el registro debe ser exitoso
