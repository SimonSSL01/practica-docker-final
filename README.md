# Practica Final Docker
TesloShop – Aplicación Contenerizada (Docker)

Este proyecto implementa una arquitectura end-to-end contenerizada usando Docker y Docker Compose. La aplicación está dividida en tres servicios principales, los cuales son:
Frontend (Aplicación Angular servida con Nginx), Backend (API REST desarrollada en NestJS) y Base de datos (PostgreSQL)

Todos los servicios se comunican a través de una red interna de Docker (teslo-network).

Diagrama lógico
[ Usuario ]
     ↓
[ Nginx (Frontend Angular) ]
     ↓ (proxy /api)
[ Backend (NestJS) ]
     ↓
[ PostgreSQL ]

Tecnologías utilizadas
Docker & Docker Compose
Node.js (NestJS)
Angular
Nginx
PostgreSQL

Pasos de ejecución

Sigue estos pasos para levantar el proyecto correctamente:

1. Clonar el repositorio
git clone <url-del-repo>
cd tesloshop

2. Crear archivo de entorno
cp .env.example .env

Editar .env y configurar:

POSTGRES_PASSWORD=tu_password
DB_PASSWORD=tu_password
JWT_SECRET=una_clave_segura

3. Dar permisos a los scripts
chmod +x start.sh stop.sh

4. Ejecutar la aplicación

Opción con script:

./start.sh

O directamente con Docker:

docker compose up --build -d

Verificar servicios

docker compose ps

Debes ver:

teslo-db → running (healthy)
teslo-backend → running
teslo-frontend → running

6. Acceder a la aplicación
Frontend: http://localhost
Backend API: http://localhost:3000/api
Swagger: http://localhost:3000/api/docs
7. Ejecutar el seed (datos de prueba)

http://localhost:3000/api/seed

Esto cargará productos y usuarios de prueba.

Explicación de servicios
1. Base de datos (PostgreSQL)
-Imagen oficial: postgres:14.3
-Usa volumen persistente: postgres-data
-Configurada mediante variables de entorno
-Incluye healthcheck para asegurar disponibilidad

2. Backend (NestJS)
Construido con Docker multi-stage
Dos modos:
-dev: hot-reload (desarrollo)
-prod: optimizado para producción

Funcionalidades:
-API REST
-Conexión a PostgreSQL
-Autenticación con JWT
-Endpoint /api/seed

Puerto:
http://localhost:3000
3. Frontend (Angular + Nginx)
-Angular compilado en una etapa build
-Servido con Nginx en producción
-Nginx se encarga de:
-Servir la SPA
-Manejar rutas (SPA routing)
-Cachear archivos estáticos
-Hacer proxy hacia el backend (/api)

Puerto:
http://localhost
Docker Compose

El archivo docker-compose.yml orquesta:
-Creación de contenedores
-Red interna (teslo-network)
-Volúmenes persistentes
-Dependencias entre servicios

Servicios definidos:
-db → PostgreSQL
-backend → NestJS
-frontend → Angular + Nginx

Scripts
-start.sh
-Verifica que Docker esté activo
-Construye imágenes
-Levanta los contenedores
-./start.sh

stop.sh
-Detiene todos los servicios
./stop.sh

Comandos útiles

Ver logs:

docker compose logs -f

Solo backend:

docker compose logs -f backend

Reiniciar todo:

docker compose down -v
docker compose up --build -d

