This project is build using Nodejs (Express, Objection.js, Knex)

## Order App - Setel assessment

Features:
1. Login for user.
2. Display list of orders for user. Consists of order details and status states.
2. Create new orders for user.
3. Make payment for the orders. 

Installation:
1. run `npm run reset` at root directory of the project. Make sure to create database first and add those details to `.env` before you run this command. Please refer to `.env.example` on creating your own `.env` .
2. run `npm run server` to start the service
3. For creating few mocking data, run `npm run test`.

APP-deployment:
TBD

Usage API:
#####Users
- get all users 
```
GET /api/users?page[number]=1&page[size]=10,filter[email]=123@abc.com
``` 
- get user by id
```
GET /api/users/:id
```
- create new users
```
POST /api/users
{
 username: 'Jack Sparrow',
 email: 'jack@blackpearl.com',
 password: '1234Jack',
 payment_credentials: { 
  # any payment credentials
 }
}
``` 

#####Orders

- get all orders
```
GET /api/order?page[number]=1,page[size]=10
```
- get order by id

```
GET /api/orders/:id
```
- create new order

```
POST /api/orders
{
 title: 'ORDER-A',
 descriptions: 'new ship',
 user_id: 1
}
```
- update an order

```
POST /api/orders/:id
{
 title: 'ORDER-A',
 descriptions: 'new ship',
 user_id: 1
}
```
- delete an order

```
DELETE /api/orders/:id
```
- Retry payment for an order

``` 
POST /api/orders/:id/retry_payment
```
