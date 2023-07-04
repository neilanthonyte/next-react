import * as React from "react";
import { useContext, useEffect, useMemo, useState } from "react";
import * as faker from "faker";

import { useDebug } from ".";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { ConfigContext } from "../../contexts/ConfigContext";
import { useBlogArticles } from "../../hooks/content/useBlogArticles";
import {
  selectAction,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

export const DemoClient = () => {
  const { blogArticles } = useBlogArticles();
  const { config } = useContext(ConfigContext);
  useDebug({ setSessionDebug: true });

  return (
    <div>
      <p>
        Client is {config.useRealClient ? "real" : "mocked"}. Some public
        content:
      </p>
      <ul>
        {(blogArticles || []).map((a, i) => (
          <li key={i}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const DemoActions = () => {
  const { setActions } = useDebug();

  const [words, setWords] = useState<string>(null);
  useEffect(() => {
    setActions([
      {
        label: words ? "Clear" : "Set words",
        action: () => setWords(words ? null : faker.lorem.words(10)),
      },
    ]);
  }, [words]);

  return <p>{words || "click to generate some words!"}</p>;
};

export const DemoOutput = () => {
  const { setOutput } = useDebug({ output: null });

  return (
    <p>
      <a onClick={() => setOutput("Hello world!")}>Click to set output</a>
    </p>
  );
};

export const DemoPositioning = () => {
  // initialise the setting
  useDebug({ isFixed: false });
  const words = useMemo(() => {
    return faker.lorem.words(100);
  }, []);

  return (
    <div style={{ background: "#efc" }}>
      <h4>Some bulky content</h4>
      <p>{words}</p>
    </div>
  );
};

export const DemoDoubleHandler = () => {
  return (
    <NextAppHandlerWeb>
      <p>
        For examples that already have a NextAppHandler - the second will be
        skipped
      </p>
    </NextAppHandlerWeb>
  );
};

const demoTesting = {
  componentName: "DemoWrapper",
  scenario: "testing",
};

/**
 * Demonstrate the features to aid testing including:
 * - data attributes to pass back test information
 * - validating output
 * - clicking actions
 */
export const DemoTesting = () => {
  const { setActions, setOutput, setTestAttributes, output } = useDebug({
    output: "hello world",
    test: demoTesting,
  });

  useEffect(() => {
    setActions([
      {
        test: "foo",
        label: "Foo",
        action: () => setOutput("foo"),
      },
      {
        test: "bar",
        label: "Bar",
        action: () => setOutput("bar"),
      },
    ]);
    setTestAttributes({
      secret: "bar",
    });
  }, []);

  const [demoElement, setDemoElement] = useState<string>();
  const [actionElement, setActionElement] = useState<string>();

  useEffect(() => {
    // keep checking the state of the DOM to highlight the values
    const timeout = setTimeout(() => {
      // select the main demo wrapper
      const demoSelector = selectDemo(
        demoTesting.componentName,
        demoTesting.scenario,
      );
      setDemoElement(
        document.querySelector(demoSelector).outerHTML.replace(/>.*/, ">"),
      );

      // select an action
      const actionSelector = selectAction("foo");
      setActionElement(
        document
          .querySelector(`${demoSelector} ${actionSelector}`)
          .outerHTML.replace(/>.*/, ">"),
      );
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [output]);

  return (
    <>
      <p>
        The following element are pulled from the DOM and demonstrate the
        dynamic markup provided:
      </p>
      <ul>
        <li>Test element: {demoElement}</li>
        <li>Action element: {actionElement}</li>
      </ul>
    </>
  );
};
