

## Running the app

```bash
# build
$ docker compose build

# run
$ docker compose up
```

## Documentation

API Swagger documentation is available at http://localhost:3000/api

## Notes

* The login works as follows: the user sends a post request to the login end point, we make sure the user ID exist, and then we make sure the password matches. When successful we then generate a UUID and save it in Redis with the user ID as the key, and a TTL to be the session length. 
* The login system uses Redis to save a user login status, I used Redis because it's a well known, documented and maintained key/value db, and it has auto support for TTL.
* For the API itself I've implemented it with Nest.js and Postgres using TypeOrm which has native support and is db agnostic, For Redis I used the library ioredis which gives me an injectable to handle Redis operations.
* The db for the project is Postgres, I used it because I have experience with it and it supports json objects.
