# API Red Social

Servicio que contiene la lógica de una **red social**: gestiona usuarios, publicaciones, comentarios, reacciones y seguidores. Una aplicación web o móvil podría conectarse a él para funcionar.

> Esta rama, `F3SHARITH`, tiene la versión completa con los 6 módulos. La rama `master` conserva la versión inicial, con roles y usuarios.

## ¿Qué incluye?

| Módulo | Qué gestiona |
|---|---|
| **Usuarios** | Crear, consultar, editar y desactivar cuentas |
| **Roles** | Tipos de usuario |
| **Publicaciones** | Lo que comparten los usuarios |
| **Comentarios** | Respuestas a las publicaciones |
| **Redacciones** | Reacciones a las publicaciones |
| **Seguidores** | Quién sigue a quién |

Las contraseñas se guardan cifradas y los datos que llegan se validan antes de procesarse.

## Herramientas

| Herramienta | Para qué se usa |
|---|---|
| [NestJS 11](https://nestjs.com/) | Framework para organizar el servicio por módulos |
| [TypeScript](https://www.typescriptlang.org/) | Lenguaje del proyecto |
| [MongoDB](https://www.mongodb.com/) | Base de datos |
| [Mongoose](https://mongoosejs.com/) | Definir cómo se guarda cada tipo de información |
| [Swagger](https://swagger.io/) | Documentar y probar el servicio desde el navegador |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Cifrar las contraseñas |
| [class-validator](https://github.com/typestack/class-validator) | Revisar que los datos recibidos sean correctos |
| [Jest](https://jestjs.io/) | Pruebas automáticas |

## Cómo está organizado

```text
src/
├── common/      → Manejo de errores y formato común de respuestas
└── modules/     → Una carpeta por módulo
    └── usuarios/
        ├── dto/                    → Forma de los datos que se reciben
        ├── schemas/                → Forma de los datos que se guardan
        ├── usuarios.controller.ts  → Direcciones disponibles
        └── usuarios.service.ts     → Lógica del módulo
```

## Cómo ejecutarlo

Necesitas tener instalado [Node.js](https://nodejs.org/) y una base de datos MongoDB.

1. Crea un archivo `.env` con estos valores:

```env
MONGODB_URI=mongodb://localhost:27017/red_social
PORT=3000
```

2. Instala las dependencias e inicia el servicio:

```bash
npm install
npm run start:dev
```

3. Abre <http://localhost:3000/swagger> para ver y probar todo lo que ofrece.
