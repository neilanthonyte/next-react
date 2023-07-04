import { useEffect, useRef } from "react";

// https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering
export function useTraceUpdate(props: any) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      // TODO?
    }
    prev.current = props;
  });
}

// Usage
// function MyComponent(props) {
//   useTraceUpdate(props);
//   return <div>{props.children}</div>;
// }
