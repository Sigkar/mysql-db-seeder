const sh = require("shelljs");

const cleanupFailures = () => {
  process.stdout.write("\nDetected errors from last run - cleaning up\n")
  sh.exec(`export NODE_ENV=setup`);
  sh.exec(`db-migrate db:drop mysql_db_seed_tests`);
  sh.rm("-f", ".env");
  sh.exec(`export NODE_ENV=development`);
}

module.exports = cleanupFailures;