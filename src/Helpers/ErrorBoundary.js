import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    const { setMessage } = this.props;
    this.setState({ hasError: true });

    setMessage({ text: 'an error has occurd', type: 'error' });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return null;
    }
    return children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default ErrorBoundary;
