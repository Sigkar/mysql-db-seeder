require("dotenv").config();
const Seeder = require("../index").Seeder;
test("creates the seeding instance and executes", () => {
  const seed = new Seeder(
    process.env.POOL_LIMIT,
    process.env.CONNECTION,
    process.env.USERNAME,
    process.env.PASSWORD,
    process.env.DATABASE,
    "en"
  );
  expect(seed).toBeTruthy();
})