

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


## Requests

* Create a user:  `curl --location 'localhost:3000/user' \
  --header 'Content-Type: application/json' \
  --data '{
  "playerId": "user",
  "password": "user"
  }'`
  
* Login:  `curl --location 'localhost:3000/user/login' \
  --header 'Content-Type: application/json' \
  --data '{
  "playerId": "user",
  "password": "user"
  }'`
  
* Create an offer:  `curl --location 'localhost:3000/offers' \
--header 'Content-Type: application/json' \
--data '{
"gameId": "33",
"availability": 191,
"offerSetName": "bundle medium",
"offerSetId": "6666",
"sku": "222",
"priceInCents": "3900",
"currency": "usd",
"products": [
{
"amount": 500,
"sku": "002",
"name": "dice medium"
},
{
"amount": 1500,
"sku": "005",
"name": "coins medium"
}
]
}'`
   
* Update an offer: `curl --location --request PUT 'localhost:3000/offers/6666' \
  --header 'Content-Type: application/json' \
  --data '{
  "gameId": "33",
  "availability": 191

}'`

* Delete an offer: `curl --location --request DELETE 'localhost:3000/offers/6666' \
  --data ''`
  
* Get offers: `curl --location 'localhost:3000/offers'`

* Get offer by ID:  `curl --location 'localhost:3000/offers/6666'`

* create an order: `curl --location 'localhost:3000/orders' \
  --header 'Content-Type: application/json' \
  --data '{
  "sessionId":"7dfd0c56-b58c-4bd3-9580-15a149735b84",
  "offerSetId":"6666",
  "credit":{
  "number":"4242424242424242",
  "expDate":"1229",
  "cvv":"666"
  }
  }'`