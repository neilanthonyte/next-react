// The calling module
const cwd = process.cwd();

module.exports = {
  rootDir: cwd,
  verbose: true,
  testURL: "http://localhost/",
  testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).ts"],
  transform: {
    "\\.scss$": "<rootDir>/baseConfig/jestPreprocess/scss.js"
  },
  setupFilesAfterEnv: ["<rootDir>/baseConfig/jest-setup.js"],
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/baseConfig/jestMocks/fileMock.js",
    "\\.(css)$": "<rootDir>/baseConfig/jestMocks/styleMock.js"
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-reports",
        outputName: "jest-junit.xml"
      }
    ]
  ],
  globals: {
    env: {
      // Place any globals here
      hackInventory: false,
      overdueThreshold: 60
    }
  }
};
