# Animal Api

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routes
  
  Warning: All endpoints can throw bad request exceptions if doesn't send data. 
  
### Users Routes: 
    
 - POST http://localhost:8000/api/users/auth : Authentificates an user. Requires an email and a password at body request. Returns an object.
 
 - POST http://localhost:8000/api/users/register : Register an user. Requires an email, a password, a country, a state and a city at body request. Returns an object.
 
### Animal Routes: 

- GET http://localhost:8000/api/animals : Get all animals.Require an authorization(token) at header request. Returns an animal array. 

- POST http://localhost:8000/api/animals : Save an animal. Require a name, an age(int) and a kind at body request, and an authorization(token) at header request. Returns a message.

- PUT http://localhost:8000/api/animals : Modified an animal. Require a name, an age(int), a kind and an id(int) at body request, and an authorization(token) at header request. Returns an object

- DELETE http://localhost:8000/api/animals/:id : Delete an animal. Require an id(int) at param and an authorization(token) at header request. Returns an object


