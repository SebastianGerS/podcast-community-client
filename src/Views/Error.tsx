import React, { useEffect } from 'react';
import { scrollToTop } from '../Helpers/UserAgent';
import ErrorComponent from '../Components/Common/Error';

function Error(): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <ErrorComponent />
  );
}

export default Error;
