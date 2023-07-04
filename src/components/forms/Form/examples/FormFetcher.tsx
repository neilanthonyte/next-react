import * as React from "react";
import axios from "axios/index";

import { Form } from "../index";

export class FormFetcher extends React.Component {
  nextFetch: any;
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      form: null,
      version: 0,
      output: null,
      missing: true,
    };
    this.nextFetch = null;
  }
  fetchForm = () => {
    if (!(env && env.formUrl)) {
      return;
    }
    // This will trigger another willUpdate call, thereby creating a fetch interval.
    axios
      .get(env.formUrl)
      .then((res) => res.data)
      .then((form) => {
        this.nextFetch = setTimeout(this.fetchForm, 2000);
        if (
          this.state.form &&
          JSON.stringify(form) === JSON.stringify(this.state.form)
        ) {
          return;
        }

        let incrementalVersion = this.state.version;
        this.setState({
          form: form,
          version: ++incrementalVersion,
        });
      })
      .catch((err) => {
        this.setState({ errorMessage: err.toString() });
      });
  };
  componentDidMount() {
    this.fetchForm();
  }
  componentWillUnmount() {
    if (this.nextFetch) {
      clearTimeout(this.nextFetch);
    }
  }
  render() {
    const { form, version, errorMessage } = this.state;
    const { formUrl } = env;

    if (!formUrl) {
      return (
        <p>
          Please set FORM_URL in your <code>.env</code>
        </p>
      );
    }
    if (errorMessage) {
      return (
        <div>
          <p>
            Unable to fetch <code>{env.formUrl}</code>. Please rectify the
            following and reload:
          </p>
          <div>
            <pre>{errorMessage}</pre>
          </div>
        </div>
      );
    }
    if (!form) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Form
          schema={form.fields}
          dataTransformers={form.transformers}
          key={version}
          onSuccess={(data) => {
            this.setState({ output: data });
          }}
          onError={() => {
            // do nothing
          }}
        />
        <div>
          <h4>Output</h4>
          <pre>{JSON.stringify(this.state.output, null, 2)}</pre>
          <pre>{JSON.stringify(form)}</pre>
        </div>
      </div>
    );
  }
}

export default FormFetcher;
