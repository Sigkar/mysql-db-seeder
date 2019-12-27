const mysql = require("mysql");
const faker = require("faker");

class Seeder {
  constructor(limit, host, user, password, database, locale = "en") {
    faker.locale = locale;
    faker.seed(this.getRandomInt(100000000, 999999999));
    this.connection = mysql.createPool({
      connectionLimit: limit, // default = 10
      host: host,
      user: user,
      password: password,
      database: database
    });
  }

  /**
   * @author Sigkar <github.com/sigkar>
   * @param {int} rounds
   * @param {string} table
   * @param {object} sqlObject
   * @example
   *    await seed.seed(
   *      10,
   *      'users',
   *      {
   *        email: () => someValueCallback(),
   *        username: "someString",
   *        unixTimestamp: 9018490124,
   *      }
   *    )
   */
  async seed(rounds = 1, table, sqlObject) {
    process.stdout.write(`\nSeeding ${table}\n`);
    let keys, values, id;
    let ids = [];
    for (let i = 0; i <= rounds; i++) {
      process.stdout.write(".");
      values = Object.values(sqlObject).map(value => {
        if (typeof value === "function") {
          return value();
        } else {
          return value;
        }
      });
      keys = Object.keys(sqlObject).join(", ");

      id = await new Promise(resolve => {
        this.connection.query(
          `INSERT INTO ${table} (${keys}) VALUES (?)`,
          [values],
          (err, results, fields) => {
            if (err) {
              this.handleError(err);
              return;
            }
            resolve(results.insertId);
          }
        );
      }).catch(err => {
        this.handleError(err);
      });
      ids.push(id);
    }
    return ids;
  }

  getRandom(ids, percentChoice) {
    return ids.filter(id => {
      if (this.getRandomInt(1, 100) > percentChoice) return id;
    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  nativeTimestamp() {
    return {
      toSqlString: function() {
        return "CURRENT_TIMESTAMP()";
      }
    };
  }

  exit() {
    process.stdout.write("\nExiting gracefully\n");
    this.connection.end();
    process.exit();
  }

  handleError(err) {
    process.stdout.write("An internal error occured");
    console.error(err);
    process.exit(1);
  }
}

module.exports = Seeder;
