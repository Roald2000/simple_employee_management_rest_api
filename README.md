# Simple Employee Management RESTful API

## To use/access or perhaps configure this code to suite your interest or curiosity you must first have one of these application/software installed on your pc/laptop device etc..

- NodeJS
- MySQL and/or MySQL server, I use XAMPP for this
- Code Editor VSCode

### After cloning/downloading this repo simply enter the command in your terminal/cli

- open your terminal or cli
- navigate to the repo directory
- `npm install`
- run your MySQL Server after creating your database
- input this to the terminal `npm run start`
- make some changes, watch the terminal logs all and while syncing your models to the created database as specified in your .env file

### NPM packages/dependencies installed or used

```json
  "devDependencies": {
    "express": "^4.18.2",
    "nodemon": "^3.0.1"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "http-errors": "^2.0.0",
    "jsonwebtoken": "^9.0.1",
    "moment": "^2.29.4",
    "mysql": "^2.18.1",
    "sequelize": "^6.32.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0",
    "uuid": "^9.0.0"
  }

```

### What the `.env` file should contain

```js
secret_key =
  "1c73784b13d314cbe0f946f54a0f7a516f7c31b82b4591f79a84eae9486a737ab8898e2dca2944541ee0f853c4182adaccc2fcd1bd80260769049c78a5c5cf29";
secret_key_life = "1 day";
api_port = 1290;

host = "localhost";
port = "3306";
user = "root";
password = "";
database = "employee_db";
```

### in this part i override the dotenv config to .env.local but you can empty it

from

```js
require("dotenv").config({ path: "./.env.local", override: true });
```

to

```js
require("dotenv").config();
```

so you can access it using your own `.env` file

### This API has features implemented :

- JWT Authentication
  - it is implemented as a middleware
  - Means every time you access the employee routes you first need to login to be granted an access token
- Role Base Authentication
  - if the user has either user,admin or just guest, determines or limits the API accessibility depending on what the role the user is registered as
- Login/Registration System
  - implented by accessing the user routes for logging in valid credentials and registering user for gaining access to the API
  - provides access to the API by creating an account managed by an admin that has direct access to the database

### The API just as the title states is to manage employees information and their work/position on any department or how many position they hold. Simply saying using MySQL the data is structured with a One-to-Many relationship where there is only one personnel/employee and each of the employee can have many position they want to be assigned to by an admin or a user that has administrative access.

### To read more about how the API works simply go to the route endpoint `/api-docs` for more detailed API documentation with the swagger ui documentation for detailed and informative presentation of the API and provides accessibility


<p style="color:red;">Im still not done with the swagger docs hehe 😉😉😘</p>

so up to you to go around and figure out hehe