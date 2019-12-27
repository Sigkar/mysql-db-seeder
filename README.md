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


## TODO:
- Tests
- Update tables
- Callbacks for more insertions

## Author
[Sigkar](https://github.com/sigkar)