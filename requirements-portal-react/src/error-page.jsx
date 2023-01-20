import { useRouteError } from "react-router-dom";

import React from 'react'

export default function ErrorPage() {
const error = useRouteError();
console.log(error);

  return (
    <div id="error-page">
      <h1>Error!</h1>
      <p>Unexpected error has occured.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
