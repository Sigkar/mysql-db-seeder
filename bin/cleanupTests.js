const sh = require("shelljs");
process.stdout.write("\nTESTS COMPLETE\n> Cleaning up");
sh.exec(`export NODE_ENV=setup`);
process.stdout.write("\n> Dropping mysql_db_seed_tests database, deleting .env file\n");
sh.exec(`db-migrate db:drop mysql_db_seed_tests`);
sh.rm("-f", ".env");
process.stdout.write("\nResetting node_env to development");
sh.exec(`export NODE_ENV=development`);
process.stdout.write("\nComplete.");
process.exit();
