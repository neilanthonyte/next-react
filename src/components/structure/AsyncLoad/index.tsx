import * as React from "react";

import { LoadingOverlay } from "../../generic/Loader";
import { ErrorPlaceholder } from "../ErrorPlaceholder";
import { PendingContent } from "../PendingContent";

export interface IAsyncLoadProps {
  load: any;
  children?: any;
  name?: any;
  component: any;
}

export interface IAsyncLoadStates {
  _mounted: boolean;
  isLoaded: boolean;
  showError: any;
  data: any;
}

export class AsyncLoad extends React.Component<
  IAsyncLoadProps,
  IAsyncLoadStates
> {
  constructor(props: IAsyncLoadProps) {
    super(props);
    this.state = {
      _mounted: false,
      isLoaded: false,
      showError: false,
      data: null,
    };
    this.tryFetch();
  }

  public onErrorClick = async () => {
    this.setState({
      showError: false,
      isLoaded: false,
    });
    this.tryFetch();
  };

  public tryFetch = () => {
    this.props
      .load()
      .then((data: any) => {
        // ensure we haven't toggled away since
        if (!this.state._mounted) {
          return;
        }
        // trigger re-render and pass to component
        this.setState({
          data,
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          showError: true,
          isLoaded: true,
        });
      });
  };

  public componentDidMount() {
    this.setState({
      _mounted: true,
    });
  }

  public componentWillUnmount() {
    this.setState({
      _mounted: false,
    });
  }

  public render = () => {
    const { isLoaded, showError, data } = this.state;
    const { children, name, component: Component } = this.props;

    // build the child props
    const childProps = name ? { [name]: data } : data;

    if (showError) {
      return <ErrorPlaceholder retry={this.onErrorClick} />;
    }

    const getContent = () =>
      Component ? (
        <Component {...childProps} />
      ) : (
        React.cloneElement(children, childProps)
      );

    return (
      <PendingContent check={isLoaded}>
        {isLoaded && getContent()}
      </PendingContent>
    );
  };
}
