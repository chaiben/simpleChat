# simpleChat

Un chat simples desarollado utilizando:

- NodeJS
- React + TypeScript
- Socket.io
- Base de datos MySQL

Como instalar:

1. Descargar ese repositorio
2. (Opcional) Levantar la máquina Docker:

   ```
   cd server
   cd docker
   docker compose up
   ```

3. Configurar el archivo de entorno.
   1. Copiar el archivo `.env-template` a `.env`
   2. Modificar el archivo `.env` con la configuración de la base de datos
4. Ejecutar el servidor Node

   ```
   cd server
   npm run start
   ```

5. Ejecutar el servidor de FrontEnd

   ```
   cd client
   npm run start
   ```

Abrir el cliente en su navegador favorito, crear un (o más usuarios). Empezar a chatear.
