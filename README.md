# rick-and-morty-encyclopedia

Simple servicio para mostrar los personajes de Rick and Morty.

Levanta el frontend en el puerto 8000 y el backend en el 4000. Redis se expone en el puerto 6379.

# Correr

docker-compose up --build

# Consideraciones

Se agrega un usuario para probar el sistema por defecto:

    - Usuario: summer
    - Password: smith1111

Si se desean agregar usuarios es necesario usar el endpoint de registro:

POST: localhost:3000/users/register

Body:
{ "username":"rodrigo", "password": "1234" }

# Tests

Para ejecutar los test en la carpeta /server ejecutar:

    - npm test

# Covertura

--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   83.33 |       50 |    62.5 |   83.33 |                   
 server             |   95.83 |      100 |       0 |   95.83 |                   
  server.js         |   95.83 |      100 |       0 |   95.83 | 49                
 server/middlewares |      40 |        0 |       0 |      40 |                   
  auth.js           |      40 |        0 |       0 |      40 | 2-7               
 server/services    |      80 |       60 |   83.33 |      80 |                   
  characters.js     |     100 |       50 |     100 |     100 | 9                 
  users.js          |      70 |     62.5 |      75 |      70 | 16-17,43-57       
 server/utils       |     100 |      100 |     100 |     100 |                   
  redis-client.js   |     100 |      100 |     100 |     100 |                   
--------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        3.831 s
Ran all test suites.
