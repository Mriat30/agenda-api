# Agenda API - Ecosistema de Gestión de Turnos

Backend escalable diseñado bajo los principios de **Arquitectura Hexagonal** (Ports and Adapters) y **Domain-Driven Design (DDD)** para la gestión automatizada de agendas y turnos.

## 🚀 Tecnologías Principales
- **Lenguaje:** TypeScript
- **Runtime:** Node.js / Express
- **ORM:** Prisma
- **Base de Datos:** PostgreSQL
- **Testing:** Jest (Unitarios e Integración) y Cucumber (Pruebas de Aceptación/BDD)

## 🚀 Ejecución de la Aplicación
```bash
  npm run dev 
  ```
## ⚙️ Desarrollo

Este proyecto utiliza
ntorno de desarrollo estandarizado y una suite completa de pruebas para garantizar la integridad de la lógica de negocio.

### 🐳 Entorno de Desarrollo (Remote Development)
El proyecto cuenta con configuración para **Dev Containers**, permitiendo un entorno consistente mediante Docker.
- **Levantar el entorno:** 
```bash
  ./start_dev_container.sh 
  ```
- **Uso en VS Code**: Al abrir la carpeta, el editor sugerirá automáticamente "Reopen in Container". Esto instalará todas las dependencias y configurará TypeScript y Prisma sin necesidad de instalaciones locales.

## 🧪 Ejecución de Tests

- **Suite completa:** Ejecuta Linter, Tests Unitarios, Integracion y de Aceptación.
```bash
  npm run test:all
  ```

- **Unitarios:** Valida la lógica de dominio y casos de uso con Jest y genera reporte de cobertura.
```bash
  npm run test:unit
  ```


- **Aceptacion:** Valida historias de usuario utilizando Cucumber-js (Gherkin).
```bash
  npm run test:bdd
  ```


- **Integracion:**Pruebas específicas sobre los repositorios de infraestructura.
```bash
  npm run test:integration
  ```


  ## 🔍 Estilo y Calidad de Código

  Mantenemos el estándar de código mediante ESLint y Husky (Git Hooks):
  - **Revisar estilo**
  ```bash
  npm run lint
  ```
  - **Corregir automaticamente**
  ```bash
  npm run lint:fix
  ```

  ## 🗄️ Base de Datos (Prisma)

  - **Generar cliente**
  ```bash
  npm run prisma:generate
  ```
  - **Sincronizar esquema**
  ```bash
  npm run prisma:push
  ```

    

  