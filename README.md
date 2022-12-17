# This project is basically abandoned. I want to work on it, but the Cobbler goes without shoes. I just don't have time.

# mysql-db-seed

Dead simple database seeding framework for NodeJS

Only support for MySQL

## Usage

### Installation
`$ npm install --save-dev mysql-db-seed`

### Usage

Pass the method as a callback to get new data.
Using Faker.JS:

```
// dbseeder.js
const faker = require("faker");
const Seeder = require("mysql-db-seed").Seeder;
// ES6 use `import {Seeder} from "mysql-db-seed";`

// Generate a new Seeder instance
const seed = new Seeder(
  10, 
  "db_host",
  "db_username",
  "db_password",
  "database"
);

(async () => {
  await seed.seed(
    30,
    "users", 
    {
      email: faker.internet.email,
      profile_picture: faker.image.people,
      first_name: faker.name.firstName,
      last_name: faker.name.lastName,
      uuid: faker.random.uuid,
      created_at: seed.nativeTimestamp(),
      updated_at: seed.nativeTimestamp()
    }
  )
  seed.exit();
  process.exit();
})();
```

Then,
`node dbseeder.js`



## Seed.seed Properties

| Props             | Description                                     | 
| ------------------| ------------------------------------------------| 
| rounds            | Number of times to create a new record.         | 
| table             | String value of the table name                  | 
| mysqlObject       | Key-value pairs to generate a MySQL insert query|


## Testing

- First time?
  - Create a MySQL user `mysql-db-seed` with the password `mysql-db-seed`
  - Grant read/write to `mysql_db_seed_tests` table
```sql
CREATE USER 'mysql-db-seed'@'localhost' IDENTIFIED BY 'mysql-db-seed';
GRANT ALL PRIVILEGES ON mysql_db_seed_tests.* TO 'mysql-db-seed'@'localhost';
FLUSH PRIVILEGES;
/* ensure the user was created */
SELECT user,authentication_string,plugin,host FROM mysql.user;
```

- To run tests:
  - `$ npm run test`


## TODO:
- Tests
- Update tables
- Callbacks for more insertions

## Author
[Sigkar](https://github.com/sigkar)
