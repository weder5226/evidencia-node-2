# 🛒 Proyecto Sistema de Ventas — Backend API

Este es un backend avanzado para un sistema de ventas, construido con **Node.js** usando el potente framework **NestJS** y **Prisma** como ORM para conectarse a una base de datos **PostgreSQL**.  
Incluye los módulos de:

- Productos
- Detalles de productos
- Inicio de sesión y autenticación con tokens

---

## ⚙️ Requisitos

Asegúrate de tener las siguientes versiones o superiores instaladas:

- **Node.js** `v22.x`
- **npm** `v11.x`
- **PostgreSQL** `v16.x`

---

## 🚀 Instalación y ejecución

Sigue estos pasos para levantar el proyecto:

### 1. Asegúrate de tener PostgreSQL corriendo

Debes tener un servidor PostgreSQL activo. Puedes usar uno local o remoto, mientras tengas acceso con una URL válida.

### 2. Clona el repositorio

```bash
git clone https://github.com/weder5226/evidencia-node-2
cd evidencia-node-2
```

### 3. Instala las dependencias

```bash
npm install
```

### 4. Crea el archivo .env

En la raíz del proyecto, crea un archivo .env con el siguiente contenido (Reemplazando _usuario, contraseña, nombre_basedatos y tu_clave_secreta_segura_):

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_basedatos
TOKEN_SECRET=tu_clave_secreta_segura
```

### 5. Ejecuta la migración inicial de la base de datos

Esto generará las tablas necesarias y el cliente Prisma:

```bash
npm run db:migrate
```

### 6. Levanta el servidor

```bash
npm run dev
```

Esto inicia el servidor NestJS en el puerto 8080 por defecto.

### 7. Abre la documentación Swagger

Dirígete en tu navegador a: http://localhost:8080

Serás redirigido automáticamente a la interfaz Swagger, donde puedes explorar y probar todos los endpoints.

---

## 🔐 Autenticación

- Registra un nuevo usuario usando el endpoint correspondiente.
- Haz login con las credenciales registradas.
- Swagger te devolverá un token.
- Pega ese token en el botón "Authorize" de la interfaz de Swagger para habilitar las rutas protegidas.

---

## 🧪 Módulos actuales

- Productos: creación, consulta paginada, actualización, eliminación.
- Detalle de productos: creación, actualización, consulta paginada, eliminación.
- Autenticación: registro y login
