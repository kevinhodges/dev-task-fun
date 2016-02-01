# dev-task-fun

**dev-task-fun** is a RESTful API  that is used for storing users in a `mongodb` database.

The project makes use of `express` to handle the routes of the API, built on a `node.js` base.

# Install
To use **dev-task-fun** clone down the repo using `git clone` and then run an `npm install` to gather the relevant dependencies required for the project. As well as this you will need to install `mongod` and `mongodb`. (`brew install mongodb && mongod` if using OSX).

# Usage
Once you have everything up to date and installed, you will need to first create a mongodb instance by running `mongod` in your terminal. Next ensure you are in the project folder in a second terminal window and run the command `npm start`, if everything goes well you will be met with a success message *'Connection to mongodb successful!'*.

To test that your project is up and running, make a `GET` request to the API at `http://localhost:3000/users` using **Postman** (https://www.getpostman.com/). If all goes well you should be returned an empty array (I.e: `[]`). Horray!

Some examples of requests you can make to the API currently are as following:

`GET` `http://localhost:3000/users`
Returns a list of all users stored in the mongodb database.

`GET` `http://localhost:3000/users/:id`
Returns a specific user from the API based on the ID passed to the url

`POST` `http://localhost:3000/users`
Make a post request to the API using postman to test this endpoint.
Params: 
`forename: String,
surname: String,
email: String,
updated_at: { type: Date, default: Date.now }`

`PUT` `http://localhost:3000/users/:id`
Make a PUT request based on a user ID to update an already existent record.

`DELETE` `http://localhost:3000/users/:id`
DELETE a user record based on the ID given.

# Todo

- Add more tests and status codes.
- Add requirement of authentication