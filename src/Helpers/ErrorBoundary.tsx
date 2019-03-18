import { Component, ReactNode } from 'react';

interface Props {
  setMessage: (data: object) => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State > {
  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(): void {
    const { setMessage } = this.props;
    this.setState({ hasError: true });

    setMessage({ text: 'an error has occurd', type: 'error' });
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return null;
    }
    return children;
  }
}

export default ErrorBoundary;
