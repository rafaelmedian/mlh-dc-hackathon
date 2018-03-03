## What is react-mern-boilerplate?
It is another MERN boilerplate that allows you to start a project right a way.

It already includes registration, JWT Login, JWT refresh, password-reset hooked up so you can get started right away.

Auto-login on browser refresh, and auto JWT refresh if the user is active. So user does not get logged out randomly.

On the frontend it provides components to protect routes when a user is authorized or unauthorized.

It also includes a blogging feature with discuss for comments

![Alt text](client/assets/images/preview.png)


## Installation
- `npm i`

- create an .env file  in the root dir and add required vars. See the env section in the documentation.

- Install mongoDB if not installed.

## What is react-mern-boilerplate?

It is an opinionated starter repo for a react project using

**Database**
- [x] Mongoose

**View**
- [x] React + Redux

**Backend**
- [x] NodeJS

**Authentication**
- [ ] Facebook
- [ ] Google
- [ ] Twitter
- [x] Email

**Deployment**
- [ ] S3

## Installation 
`npm run i`

## Testing

**Client tests**
`npm run test-client` - Runs the client tests using jest

**Backend tests**
`npm run test-server` - Runs the backend tests using mocha

## Running the project

**Dev**
`npm run dev` - Starts the dev server

**Prod**
`npm run prod` - Builds and starts prod version of the project

## Deployment

**S3**
In the Command Line type

`eb init` - sort of like npm ini but for s3 deployments

`eb create webdeveloperpr-blog`

`eb deploy`

- Go to the AWS console -> EC2 -> Settings -> ENV VARS and add all of the env vars.
- Go to route53 and add a domain name then link it to the EC2 instance. 


**MongoDB Deployment**

 - Go to mLab.com.
 - Create a new DB.
 - Add all of the collections into the database.
 - Create a user.
 - Save the DB_URI to connect to the databse. 

## Env vars

# JWT
export JWT_TOKEN_SECRET_KEY=JWT_TOKEN_SECRET_KEY

# Nodemailer
export GMAIL_EMAIL=GMAIL_EMAIL
export GMAIL_PASSWORD=GMAIL_PASSWORD
export EMAIL_SERVICE=EMAIL_SERVICE

# AWS
# export AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
# export AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
# export AWS_BUCKET_NAME=AWS_BUCKET_NAME
# export AWS_REGION_NAME=AWS_REGION_NAME

#MongoDB
export MONGO_USER=MONGO_USER
export MONGO_PASS=MONGO_PASS
export MONGO_PORT=MONGO_PORT
export MONGO_DB=MONGO_DB
export MONGO_HOSTNAME=MONGO_HOSTNAME
# export MONGO_URI=MONGO_URI

#Node
export NODE_ENV=development
export PORT=80

# mlh-dc-hackathon
