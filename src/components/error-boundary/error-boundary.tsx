import { Component, ReactNode } from 'react';

interface State {
  hasError: boolean;
  errorMessage: string;
}

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error) {
    console.log(`Event boundary: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      return <div className={'error'}>{this.state.errorMessage}</div>;
    }

    return this.props.children;
  }
}
