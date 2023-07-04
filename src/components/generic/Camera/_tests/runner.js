const createTestCafe = require("testcafe");
const { basePath, tests } = require("./config.json");

tests.forEach(async (test) => {
  const { file, environment } = test;
  const { browser, hostname } = environment;
  const src = `${basePath}${file}`;
  const testcafe = await createTestCafe(hostname);
  const runner = testcafe.createRunner();
  await runner.src(src).browsers(browser).run();
  await testcafe.close();
});
