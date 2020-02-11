const fs = require('fs'); // pull in the file system module
// const url = require('url'); // pull in the url module

// Load our index fully into memory.
// THIS IS NOT ALWAYS THE BEST IDEA.
// We are using this for simplicity. Ideally we won't have
// synchronous operations or load entire files into memory.
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styleCss = fs.readFileSync(`${__dirname}/../client/style.css`);

// function to send response
const respond = (request, response, statusCode, content, contentType) => {
  response.writeHead(statusCode, { 'Content-Type': contentType });
  response.write(content);
  response.end();
};

// helper function for creating XML
const makeXML = (data) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${data.message}</message>`;
  responseXML = `${responseXML} <id>${data.id}</id>`;
  responseXML = `${responseXML} </response>`;
  return responseXML;
};

// Takes request, response and an array of client requested mime types
const getSuccess = (request, response, acceptedTypes) => {
  // object to send
  const success = {
    message: 'This is a successful response',
    id: 200,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // return response passing out string and content type
    const successResponse = makeXML(success);
    return respond(request, response, 200, successResponse, 'text/xml');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const successString = JSON.stringify(success);

  // return response passing json and content type
  return respond(request, response, 200, successString, 'application/json');
};

const getBadRequest = (request, response, acceptedTypes) => {
  // having trouble with queries
  // const parsedUrl = url.parse(request.url);

  // console.log(request);

  // split the url to check for queries
  const urlQueries = [];

  // object to send
  const badRequestValid = {
    message: 'This request has the required parameters',
    id: 200,
  };

  const badRequest = {
    message: 'Missing valid query parameter set to true',
    id: 400,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    if (urlQueries.includes('valid=true')) {
      // return response passing out string and content type
      const badResponseValid = makeXML(badRequestValid);
      return respond(request, response, 200, badResponseValid, 'text/xml');
    }
    // return response passing out string and content type
    const badResponse = makeXML(badRequest);
    return respond(request, response, 400, badResponse, 'text/xml');
  }

  if (urlQueries.includes('valid=true')) {
    // stringify the json object (so it doesn't use references/pointers/etc)
    // but is instead a flat string object.
    // Then write it to the response.
    const badRequestValidString = JSON.stringify(badRequestValid);

    // return response passing json and content type
    return respond(request, response, 200, badRequestValidString, 'application/json');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const badRequestString = JSON.stringify(badRequest);

  // return response passing json and content type
  return respond(request, response, 400, badRequestString, 'application/json');
};

const getUnauthorizedRequest = (request, response, acceptedTypes) => {
  // having trouble with queries
  // const parsedUrl = url.parse(request.url);

  // console.log(request);

  // split the url to check for queries
  const urlQueries = [];

  // object to send
  const unauthorizedRequestValid = {
    message: 'This request has the required parameters',
    id: 200,
  };

  const unauthorizedRequest = {
    message: 'Missing logged in query parameter set to yes',
    id: 401,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    if (urlQueries.includes('loggedIn=yes')) {
      // return response passing out string and content type
      const unauthorizedResponseValid = makeXML(unauthorizedRequestValid);
      return respond(request, response, 200, unauthorizedResponseValid, 'text/xml');
    }
    // return response passing out string and content type
    const unauthorizedResponse = makeXML(unauthorizedRequest);
    return respond(request, response, 401, unauthorizedResponse, 'text/xml');
  }

  if (urlQueries.includes('valid=true')) {
    // stringify the json object (so it doesn't use references/pointers/etc)
    // but is instead a flat string object.
    // Then write it to the response.
    const unauthorizedRequestValidString = JSON.stringify(unauthorizedRequestValid);

    // return response passing json and content type
    return respond(request, response, 200, unauthorizedRequestValidString, 'application/json');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const unauthorizedRequestString = JSON.stringify(unauthorizedRequest);

  // return response passing json and content type
  return respond(request, response, 401, unauthorizedRequestString, 'application/json');
};

const getForbidden = (request, response, acceptedTypes) => {
  // object to send
  const forbidden = {
    message: 'You do not have access to this content',
    id: 403,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // return response passing out string and content type
    const forbiddenResponse = makeXML(forbidden);
    return respond(request, response, 403, forbiddenResponse, 'text/xml');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const forbiddenString = JSON.stringify(forbidden);

  // return response passing json and content type
  return respond(request, response, 403, forbiddenString, 'application/json');
};

const getInternal = (request, response, acceptedTypes) => {
  // object to send
  const internal = {
    message: 'Internal Server Error. Something went wrong.',
    id: 500,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // return response passing out string and content type
    const internalResponse = makeXML(internal);
    return respond(request, response, 500, internalResponse, 'text/xml');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const internalString = JSON.stringify(internal);

  // return response passing json and content type
  return respond(request, response, 500, internalString, 'application/json');
};

const getNotImplemented = (request, response, acceptedTypes) => {
  // object to send
  const notImplemented = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 501,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // return response passing out string and content type
    const notImplementedResponse = makeXML(notImplemented);
    return respond(request, response, 501, notImplementedResponse, 'text/xml');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const notImplementedString = JSON.stringify(notImplemented);

  // return response passing json and content type
  return respond(request, response, 501, notImplementedString, 'application/json');
};

// function to handle the index page
const getIndex = (request, response) => {
  respond(request, response, 200, index, 'text/html');
};

// function to handle css page
const getStyle = (request, response) => {
  respond(request, response, 200, styleCss, 'text/css');
};

// exports to set functions to public.
module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorizedRequest,
  getForbidden,
  getInternal,
  getNotImplemented,
  getIndex,
  getStyle,
};
