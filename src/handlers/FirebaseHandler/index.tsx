import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  FirebaseContext,
  IFirebaseContextValue,
} from "../../contexts/FirebaseContext";

interface IFirebaseAnalytics {
  logEvent: Function;
}

export const FirebaseHandler: React.FC<any> = ({ children }) => {
  const [analytics, setAnalytics] = useState<IFirebaseAnalytics>();

  useEffect(() => {
    const getFirebase = async () => {
      if (window.firebase) {
        // firebase already exists.
        return window.firebase;
      } else {
        // no firebase exists yet, import module.
        const firebase = await import("firebase/app");
        await import("firebase/analytics");

        // firebase must first be initialised with credentials before use.
        if (
          !env.firebaseApiKey ||
          !env.firebaseAuthDomain ||
          !env.firebaseDbUrl ||
          !env.firebaseProjectId ||
          !env.firebaseStorageBucket ||
          !env.firebaseMessagingSenderId ||
          !env.firebaseAppId ||
          !env.firebaseMeasurementId
        ) {
          throw new Error("Firebase environment variables not set.");
        }

        const firebaseConfig = {
          apiKey: env.firebaseApiKey,
          authDomain: env.firebaseAuthDomain,
          databaseURL: env.firebaseDbUrl,
          projectId: env.firebaseProjectId,
          storageBucket: env.firebaseStorageBucket,
          messagingSenderId: env.firebaseMessagingSenderId,
          appId: env.firebaseAppId,
          measurementId: env.firebaseMeasurementId,
        };

        try {
          firebase.initializeApp(firebaseConfig);
        } catch (e) {
          if (e && e.code === "app/duplicate-app") {
            // this is fine, it's usually thrown when hot-reloading and means
            // the app already exists, and does not need to be initialised.
          } else {
            // not a 'duplicate app' error. rethrow.
            throw e;
          }
        }

        return firebase;
      }
    };

    getFirebase().then((firebase) => setAnalytics(firebase.analytics()));
  }, []);

  const logEvent = useCallback(
    (eventName: string, data: { [key: string]: any }) => {
      if (analytics) {
        analytics.logEvent(eventName, data);
      }
    },
    [analytics],
  );

  const value: IFirebaseContextValue = useMemo(
    () => ({
      logEvent,
    }),
    [logEvent],
  );

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
