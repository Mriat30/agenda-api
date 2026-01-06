# language: es
Característica: Registro de un usuario
  Como cliente,
  quiero registrarme en la plataforma de agenda de masajes,
  para poder reservar citas para masajes.

  Escenario: RU1: Registro exitoso de un nuevo usuario
    Dado que no existe un usuario registrado con el telefono "1234567890"
    Cuando registro un usuario con id "1", nombre "Juan", apellido "Garcia", teléfono "1234567890" y direccion "Esquel 123"
    Entonces el registro debe ser exitoso

  Regla: El nombre es obligatorio y debe tener formato válido

    Escenario: RU2: Usuario no se puede registrar sin nombre
      Dado que no existe un usuario registrado con el telefono "1234567890"
      Cuando registro un usuario con id "1", apellido "Garcia", teléfono "1234567890" y direccion "Esquel 123"
      Entonces el registro falla con Nombre requerido

    Escenario: RU3: Usuario no se puede registrar con un nombre vacío
      Dado que no existe un usuario registrado con el telefono "1234567890"
      Cuando registro un usuario con id "1", nombre " ", apellido "Garcia", teléfono "1234567890" y direccion "Esquel 123"
      Entonces el registro falla con Nombre requerido

    Escenario: RU4: Usuario no se puede registrar con un nombre con formato invalido
      Dado que no existe un usuario registrado con el telefono "1234567890"
      Cuando registro un usuario con id "1", nombre "Juan123", apellido "Garcia", teléfono "1234567890" y direccion "Esquel 123"
      Entonces el registro falla con Formato de nombre invalido

  Regla: Un usuario no se puede registrar con un telefono tomado

    @wip
    Escenario: RU5: Usuario no se puede registrar con un telefono tomado
      Dado que existe un usuario registrado con el telefono "1234567890"
      Cuando registro un usuario con id "2", nombre "Pedro", apellido "Perez", teléfono "1234567890" y direccion "Calle Falsa 123"
      Entonces el registro falla con Telefono ya registrado