# Prueba Técnica – Backend Node.js

## 🎯 Objetivo
Desarrollar una API REST para la gestión de **abogados** y **demandas** en un bufete.  
Se evaluará arquitectura, manejo de base de datos, autenticación y buenas prácticas de desarrollo.

---

## 🛠️ Requerimientos Técnicos

**Obligatorios**
- Node.js (v18+), Express.js
- PostgreSQL (con Docker Compose)
- Sequelize como ORM
- JWT para autenticación básica
- Validación de datos y manejo centralizado de errores
- Git para control de versiones

**Deseables (Opcional)**
- Tests unitarios (Jest)
- Logs estructurados
- Documentación con Swagger o Postman

---

## 📂 Modelos de Datos

### Abogado (Lawyer)
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "specialization": "string",
  "status": "active | inactive",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Demanda (Lawsuit)
```json
{
  "id": "uuid",
  "case_number": "string",
  "plaintiff": "string",
  "defendant": "string",
  "case_type": "civil | criminal | labor | commercial",
  "status": "pending | assigned | resolved",
  "lawyer_id": "uuid | null",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Usuario (User)
(para login con JWT, se pueden hardcodear o crear con seeders)

```json
{
  "id": "uuid",
  "username": "string",
  "password": "string (hashed)",
  "role": "admin | operator",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## 📌 Endpoints Requeridos

### 1. Autenticación
- `POST /api/login` → devuelve JWT válido.

### 2. Gestión de Abogados
- `POST /api/lawyers` → crear abogado
- `GET /api/lawyers?page=1&limit=10` → listar abogados (paginado)
- `GET /api/lawyers/:id` → obtener abogado por ID

### 3. Gestión de Demandas
- `POST /api/lawsuits` → crear demanda
- `GET /api/lawsuits` → listar demandas (con filtros opcionales `status` y `lawyer_id`)
- `PUT /api/lawsuits/:id/assign` → asignar abogado a una demanda

### 4. Reportes
- `GET /api/reports/lawyers/:id/lawsuits` → listado de demandas por abogado

## 🧪 Payloads de Ejemplo

### Login
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Crear Abogado
```json
{
  "name": "Carlos Pérez",
  "email": "carlos.perez@example.com",
  "phone": "3001234567",
  "specialization": "Laboral",
  "status": "active"
}
```

### Crear Demanda
```json
{
  "case_number": "DEM-2025-001",
  "plaintiff": "Empresa XYZ",
  "defendant": "Juan Rodríguez",
  "case_type": "labor",
  "status": "pending"
}
```

### Asignar Abogado a Demanda
```json
{
  "lawyer_id": "uuid-del-abogado"
}
```

### Reporte de Demandas por Abogado (respuesta esperada)
```json
{
  "lawyer": {
    "id": "uuid-del-abogado",
    "name": "Carlos Pérez"
  },
  "lawsuits": [
    {
      "id": "uuid-demanda",
      "case_number": "DEM-2025-001",
      "status": "assigned"
    }
  ]
}
```

## ✅ Entregables
- Repositorio en GitHub con el código fuente
- Migraciones y seeders con datos de prueba
- Docker Compose funcional para PostgreSQL
- README con instrucciones claras para instalar y ejecutar
- Documentación de API (Swagger o Postman)



## 📝 Evaluación
- Arquitectura y calidad de código
- Correcta implementación de endpoints y manejo de errores
- Uso de Sequelize y PostgreSQL con migraciones
- JWT y middleware de seguridad funcionando
- Documentación mínima (README + Postman/Swagger)
- Extras (para destacar): tests unitarios, logs estructurados.

---

## Instrucciones para Instalar y Ejecutar

### Requisitos Previos
- **Node.js**: Versión 18 o superior (se recomienda v22.15.0). Descarga desde [nodejs.org](https://nodejs.org/).
- **Docker**: Instala Docker y Docker Compose desde [docker.com](https://www.docker.com/get-started).
- **Git**: Instala Git desde [git-scm.com](https://git-scm.com/downloads).
- **Postman o Swagger**: Para probar los endpoints (opcional, ya que Swagger está integrado).

### Pasos de Instalación
1. **Clona el repositorio:**
   - Abre una terminal y ejecuta:
     ```
     git clone https://github.com/lesliedaihana/Prueba-Backend-Node.js.git
     ```
   - Navega al directorio del proyecto:
     ```
     cd Prueba-Backend-Node.js
     ```

2. **Instala las dependencias:**
   - Ejecuta:
     ```
     npm install
     ```
   - Esto instalará Node.js, Express, Sequelize, JWT, Swagger, Winston, y otras librerías necesarias.

3. **Configura la base de datos:**
   - Edita el archivo `src/config/config.json` con tus credenciales de PostgreSQL. Usa este ejemplo como guía:
     ```json
     {
       "development": {
         "username": "postgres",
         "password": "tu_contraseña",
         "database": "legalsuite",
         "host": "localhost",
         "dialect": "postgres"
       }
     }
     ```
   - Reemplaza `tu_contraseña` con la contraseña de tu instalación de PostgreSQL (puede ser la predeterminada si usas Docker, como `password`).

4. **Inicia el contenedor de PostgreSQL:**
   - Ejecuta:
     ```
     docker-compose up -d
     ```
   - Esto iniciará un contenedor PostgreSQL en segundo plano. Verifica que esté activo con:
     ```
     docker ps
     ```
   - Si hay errores, asegúrate de que el puerto 5432 no esté en uso.

5. **Ejecuta las migraciones:**
   - Aplica las migraciones para crear las tablas en la base de datos:
     ```
     npx sequelize-cli db:migrate
     ```
   - Esto configurará las tablas `Users`, `Lawyers`, y `Lawsuits` según los modelos.

6. **Carga los datos de prueba:**
   - Ejecuta los seeders para poblar la base de datos con usuarios y datos iniciales:
     ```
     npx sequelize-cli db:seed:all
     ```
   - Esto creará un usuario de prueba (`admin_user` con contraseña `admin123`) y otros datos.

7. **Inicia el servidor:**
   - Ejecuta:
     ```
     node server.js
     ```
   - El servidor se iniciará en `http://localhost:3000`. Verifica en la consola el mensaje: `Server running on port 3000`.

### Pruebas y Uso
- **Documentación Interactiva:**
  - Accede a la documentación Swagger en `http://localhost:3000/api-docs` para explorar y probar todos los endpoints.
  - Autoriza las rutas protegidas usando el token JWT obtenido de `POST /api/login` (agrega `Authorization: Bearer <token>` en Swagger).

- **Ejemplo de Uso:**
  1. Inicia sesión:
     ```
     POST http://localhost:3000/api/login
     Body: {"username": "admin_user", "password": "admin123"}
     ```
     Copia el token devuelto.
  2. Crea un abogado:
     ```
     POST http://localhost:3000/api/lawyers
     Authorization: Bearer <token>
     Body: {"name": "Carlos Pérez", "email": "carlos.perez@example.com", "phone": "3001234567", "specialization": "Laboral", "status": "active"}
     ```

### Solución de Problemas
- **PostgreSQL no inicia:** Verifica que Docker esté corriendo y que el puerto 5432 no esté en uso. Revisa los logs con `docker logs <container_id>`.
- **Errores de conexión:** Asegúrate de que las credenciales en `config.json` sean correctas.
- **Servidor no responde:** Revisa los logs en `combined.log` (generados por Winston) para depurar errores.
- **Dependencias faltantes:** Asegúrate de haber ejecutado `npm install`.

---

## Tecnologías
- Node.js (v22.15.0)
- Express.js
- PostgreSQL (con Docker Compose)
- Sequelize
- JWT
- Swagger (documentación)
- Winston (logs estructurados)

