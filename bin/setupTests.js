const sh = require("shelljs");
const cleanupFailures = require("./cleanupFailures");
if(sh.test('-f', '.env')){
  cleanupFailures();   
}

process.stdout.write(`\n> Changing node environment to setup`);
sh.exec(`export NODE_ENV=setup`);

process.stdout.write(`\n> Creating .env file`);
sh.exec(`echo "
CONNECTION=localhost
USERNAME=mysql-db-seed
PASSWORD=mysql-db-seed
MULTIPLE_STATEMENTS=true
DRIVER=mysql
POOL_LIMIT=10
" >> .env`);

process.stdout.write(`\n> Creating temporary database\n`);
sh.exec(`db-migrate db:create mysql_db_seed_tests`);
sh.exec(`echo "DATABASE=mysql_db_seed_tests" >> .env`);
process.stdout.write(`\n> Changing node environment to development\n`);
sh.exec(`export NODE_ENV=development`);

process.stdout.write(`\n> Migrating DB up\n\n`);
sh.exec(`db-migrate up`);
process.stdout.write("\n\nBEGINNING TESTS")