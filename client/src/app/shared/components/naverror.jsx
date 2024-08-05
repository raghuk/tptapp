import * as React from 'react';
import { useRouteError } from 'react-router-dom';


const ErrorPage = () => {
  let error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops! something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>

      <button onClick={() => (window.location.href = '/')}>Click here to reload the app</button>
    </div>
  );
};


export default ErrorPage;
