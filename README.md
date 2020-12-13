# NodeJS-AJAX
This is a rest-api. This uses NodeJS with MVC technology.

Resources (links):

- [Rest-api blog](https://stackabuse.com/building-a-rest-api-with-node-and-express/)
- [MVC video](https://www.youtube.com/watch?v=dDjzTDN3cy8)

ToDo's:

 - [x] Send email, when login
 - [x] Forgot password
 - [x] Password regex
 - [x] Check e-mail address, when forgot password

2020.12.13
 - [] Delete on registation error
 - [] Favorite
 - [] Error and success language variability

## /registration (POST)
    - input:
        - username (string)
        - email (string)
        - password (string)
        - passwordAgain (string)
    - output:
        - error OR success

## /forgotpassword (POST)
    - input:
        - email
    - output:
        - error OR success

## /login (POST)
    - input:
        - usernameEmail (string)
        - password (string)
    - output:
        - error OR success

## /login (GET)
    - input (reachable with cookie)
    - output:
        - error OR success

## /logout (POST)
    - input (reachable with cookie)
    - output:
        - error OR success

## /product (GET)
    - output:
        - error OR success

## /product (POST)
    - input:
        - name (string)
        - price (int)
        - availability (0 - NO, 1 - YES)
    - output:
        - error OR success

## /product/:id (GET)
    - output:
        - error OR success

## /product/:id (PUT)
    - input:
        - name (string)
        - price (int)
        - availability (0 - NO, 1 - YES)
    - output:
        - error OR success

## /product/:id (DELETE)
    - output:
        - error OR success

## /favorite/:id (POST)
    - output:
        - error OR success

## /favorite (GET)
    - output:
        - error OR success

## /favorite/:id (DELETE)
    - output:
        - error OR success