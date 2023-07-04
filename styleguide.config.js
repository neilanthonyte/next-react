const path = require("path");

const webpackConfigBase = require("../webpack.config");
const { generateEnvHtml } = require("../util/generateEnvHtml");

const webpackConfig = Object.assign({}, webpackConfigBase);

// custom server behaviour to demonstrate specific behaviour
function onBeforeSetupMiddleware(devServer) {
  const { app } = devServer;
  const envHtml = generateEnvHtml();

  app.get("/env.js", (req, res) => {
    res.end(envHtml);
  });

  app.get("/terms.json", (req, res) => {
    res.sendFile(path.join(__dirname, "/demo/terms.json"));
  });

  app.get("/upload-camera-image/set-key", async (req, res) => {
    const decoded = decodeURIComponent(req.query.key);
    await fs.writeFile("./image-key.txt", decoded);
    res.send("ok");
  });

  app.get("/example-image/:img", async (req, res) => {
    if (req.query.time) {
      await new Promise((res) => setTimeout(res, req.query.time));
    }
    res.sendFile(path.join(__dirname, `demo/stock-images/${req.params.img}`));
  });

  app.get("/upload-camera-image/get-key", async (req, res) => {
    try {
      const value = await fs.readFile("./image-key.txt", "utf8");
      res.send({
        key: value,
      });
    } catch (err) {
      res.send({
        key: "http://lorempixel.com/g/400/200/",
      });
    }
  });

  app.all("/upload-camera-image", (req, res) => {
    res.send("ok");
  });

  app.post("/upload-image", (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log("Uploaded image (" + body.length + " characters long)");
      res.send({ success: true });
    });
  });
}

webpackConfig.devServer.onBeforeSetupMiddleware = onBeforeSetupMiddleware;

module.exports = {
  verbose: true,
  skipComponentsWithoutExample: true,
  pagePerSection: true,
  // require: ["babel-polyfill"],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/debug/DemoWrapper')
  },
  sections: [
    {
      name: "Components",
      components: process.env.PATTERN || "src/components/**/*.tsx",
      sectionDepth: 1,
    },
  ],
  context: {
    theme: path.resolve(__dirname, "src/scss/main.scss"),
    moment: "moment",
    faker: "faker",
    _: "lodash",
  },
  template: {
    head: {
      scripts: [
        {
          src: "env.js",
        },
        {
          src: "https://developer.biodigital.com/builds/api/2/human-api.min.js",
        },
      ],
      meta: [
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content:
            "initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width height=device-height",
        },
      ],
    },
  },
  propsParser: (filepath, code) => {
    const splitPath = filepath.split("/");
    // check we are rendering email template examples otherwise the title
    // will be the company prefix
    const isEmailTemplates =
      filepath.indexOf("assets/commsTemplates/email") !== -1;

    let displayName;
    if (isEmailTemplates) {
      const companyName =
        splitPath[splitPath.length - 2].charAt(0).toUpperCase() +
        splitPath[splitPath.length - 2].slice(1);
      displayName = `${companyName}EmailTemplates`;
    } else {
      displayName = splitPath[splitPath.length - 2];
    }

    return [
      {
        description: "",
        displayName,
        methods: [],
        props: [],
      },
    ];
  },
  webpackConfig,
  serverPort: parseInt(process.env.PORT || 6060),
};
