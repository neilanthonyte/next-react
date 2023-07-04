import * as Sentry from "@sentry/browser";

class GlobalEventIntegration {
  name: string;

  constructor() {
    this.name = "GlobalEventIntegration";
  }

  setupOnce() {
    Sentry.addGlobalEventProcessor((event) => {
      return event;
    });
  }
}

export const initSentry = () => {
  if (env.sentryDsn !== undefined && env.sentryEnvironment !== "local") {
    Sentry.init({
      dsn: env.sentryDsn,
      integrations: [
        ...Sentry.defaultIntegrations,
        new GlobalEventIntegration(),
      ],
    });
  }
};
