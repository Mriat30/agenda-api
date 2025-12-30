# language: es
Característica: Consulta de usuario registrado
  Como cliente,
  quiero consultar por un usuario registrado,
  para saber si debo registrarlo.

  Escenario: CU1: Consulta exitosa de un nuevo registrado
    Dado que existe un usuario registrado de nombre "Juan" y telefono "1234567890"
    Cuando consulto el usuario con telefono "1234567890"
    Entonces la consulta es exitosa y obtengo el nombre "Juan" y telefono "1234567890"

