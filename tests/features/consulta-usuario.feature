# language: es
Característica: Registro de un usuario
  Como cliente,
  quiero consultar por un usuario registrado,
  para saber si debo registrarlo.

  @wip
  Escenario: CU1: Registro exitoso de un nuevo usuario
    Dado que existe un usuario registrado de nombre "Juan" y telefono "1234567890"
    Cuando consulto el usuario con telefono "1234567890"
    Entonces la consulta es exitosa y obtengo el nombre "Juan" y telefono "1234567890"

