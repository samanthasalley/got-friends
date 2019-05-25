/**
 * ************************************
 *
 * @module  NotFound
 * @author  boilerplate
 * @date    boilerplate
 * @description  Renders 404 message on invalid urls
 * Supports dynamic pageTypes based on where in the path the invalid route is triggered on
 *
 * ************************************
 */

import React from 'react';


const NotFound = ({ pageType }) => {
  const notFoundRender = (!pageType) ? (
      // Render generic 404 if no pageType prop is provided
    <div className="notfound-page">
      <main className="notfound-body">
        <div className="container">
          <h2 className="page-header sred">404 Not Found</h2>
          <h4>Sorry! The {pageType || 'page'} that you are looking for has been moved, removed, or does not exist.</h4>
        </div>
      </main>
    </div>
  )
  : (
    <div>
      <h3 className="page-header">404 Not Found</h3>
        <h4>Sorry! The {pageType} that you are looking for has been moved, removed, or does not exist.</h4>
    </div>
  );

  return (
    <div>
      { notFoundRender }
    </div>
  );
};

export default NotFound;
