# NxAuthNestjsAngular

This example is to demonstrate JWT authentication and refresh token authentcaiton and should not be used in production as is.

## Mono repo
Mono repo workspace using Nrwl Nx workspace.

## Authention API
Made using Nestjs.

## Client
Made using Angular 10

## Database
MonogoDB hosted on mongodb.com


## How to run

Clone the project

`git clone https://github.com/niallconaghan/nx-auth-nestjs-angular.git`

Install packages, from the root directory, run:

`npm install`

To run the client, from the root directory, run:

`nx serve client`

To run the API, run: 

`nx serve api`


## API

The api will serve on port `4500` by default.

### Setting environment

The api gettings environment variables from a `.env` file.

This file needs to be created in:

`apps/api/`

### .env settings

To change what port the api is served on:

`PORT=<port number>`

Add your monodb.com url:

`MONGO_DB_URL=<mongodb url>`

Add your JWT secret:

`JWT_SECRET=<your secret>`

Add your password salt:

`HASH_SALT=<salt number>`

Example `.env`

```
PORT=1337
MONGO_DB_URL=mongodb+srv://<username>:<password>@database.5555.mongodb.net/users?retryWrites=true&w=majority
JWT_SECRET=s0m3s3cret
HASH_SALT=10
```


## Client

The client will run on port `4200` by default.

Register a user with a username and password

Login as an authenticated user

Request protected data

After one minute your JWT token will expire

Upon requesting protected data the client will make a request to get a new JWT token using the `refresh_token` received after logging in.

After 2 minutes of no action the `refresh_token` will expire.

Any attempts to fetch protected data will log the user out.

## Route guards

Route guards are in place to block access to the content page if you are not authenticated and block access to the login page if you are authenticated


## Examples

Register a user

<a href="https://ibb.co/6PJgqps"><img src="https://i.ibb.co/XskSGdJ/register.png" alt="register" border="0" /></a>

Login with that registered user

<a href="https://ibb.co/qJ1grT0"><img src="https://i.ibb.co/dmKp58b/login.png" alt="login" border="0" /></a>

Request protected data

<a href="https://ibb.co/k3679FV"><img src="https://i.ibb.co/B4KprRH/request-successful.png" alt="request-successful" border="0" /></a>

Expired JWT, request new token via refresh_token

<a href="https://ibb.co/YcTC4Lr"><img src="https://i.ibb.co/CbscpHr/refresh-token-success.png" alt="refresh-token-success" border="0" /></a>

Authenticated again after refresh

<a href="https://ibb.co/qjvPwV0"><img src="https://i.ibb.co/bmk8nDH/success-after-refresh.png" alt="success-after-refresh" border="0" /></a>

Expired refresh token, logging out

<a href="https://ibb.co/RNfX1TJ"><img src="https://i.ibb.co/dtFNS4H/refresh-expired.png" alt="refresh-expired" border="0" /></a>



