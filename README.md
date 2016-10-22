# Node Token Authentication

## Introduction

Authentication is one of the big parts of every application. Security is always something that is changing and evolving. In the past, we have gone over Node authentication using the great Passport npm package.

Those articles used the session based authentication however, which has problems when we talk about scaling web services and creating an API that can be consumed across many devices and services.

As a primer to this article, go ahead and get yourself familiar with token based authentication principles and the standard used for token based authentication, JSON Web Tokens.

Now that we’ve got all the important information about token based authentication out of the way, let’s build a very simple Node API and use tokens to authenticate users that request access.

This repo uses JSON Web Tokens and the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package to implement token based authentication on a simple Node.js API.

This is a starting point to demonstrate the method of authentication by verifying a token using Express route middleware.

## Requirements

- node and npm

## Usage

1. Clone the repo: `git clone git@github.com:scotch-io/node-token-authentication`
2. Install dependencies: `npm install`
3. Change SECRET in `config.js`
4. Add your own MongoDB database to `config.js`
5. Start the server: `node server.js`
6. Create sample user by visiting: `http://localhost:8080/setup`

Once everything is set up, we can begin to use our app by creating and verifying tokens.

### Getting a Token

Send a `POST` request to `http://localhost:8080/api/authenticate` with test user parameters as `x-www-form-urlencoded`. 

```
  {
    name: 'Nick Cerminara',
    password: 'password'
  }
```

### Verifying a Token and Listing Users

Send a `GET` request to `http://localhost:8080/api/users` with a header parameter of `x-access-token` and the token.

You can also send the token as a URL parameter: `http://localhost:8080/api/users?token=YOUR_TOKEN_HERE`

Or you can send the token as a POST parameter of `token`.

## Conclusion

This is a good look at how we can protect routes and our Node API using JSON Web Tokens. This can be expanded into a much larger scoped project like providing permission specific tokens and creating a more robust and feature filled API.

Hopefully this look has given you a good understanding of how the routes are used (especially middleware), tokens are created, and requests to the API all come together.