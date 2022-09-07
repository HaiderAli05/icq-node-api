// importing required packages and modules
const axios = require(`axios`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const mongoose = require(`mongoose`);
const { logSuccess, logInfo, logWarning, logError } = require(`./console.helpers`);

// importing required config params
const { VERONICAS_IDP_BASE_URL, HTTP_STATUS_CODES: { SUCCESS, SERVER_ERROR } } = require(`../config`);



// This helper takes raw http auth headers, extracts the JWT searches database
// for the JWT, verifies, decodes the JWT and returns decoded token or an
// error to its caller
const verifyAccessToken = async (inputAuthHeader) => {

  try {

    // fetching the JSON web token from the request headers
    // and spliting the string to get rid of 'Bearer' keyword
    const token = inputAuthHeader.toUpperCase().startsWith(`BEARER`) ? inputAuthHeader.split(` `)[1] : inputAuthHeader;

    // creating an obj to store request config params
    const reqConfigParams = {

      headers: {

        Authorization: `Bearer ${token}`

      }

    };

    // calling Veronicas IdP to verify access token
    const result = (await axios.get(`${VERONICAS_IDP_BASE_URL}/me`, reqConfigParams)).data;

    // returning the bearer profile info to its caller
    return { status: SUCCESS, data: result };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ verifyAccessToken -> auth.helpers.js`);

    // fetching required data from error
    const { response, isAxiosError } = error;

    // 1-> storing applicable status
    // 2-> storing applicable error
    const [status, err] = [isAxiosError ? parseInt(response.status) : SERVER_ERROR, isAxiosError ? response.data.error_description : `An unhandled exception occurred verifying access token.`];

    // returning status and error indicating failure to its caller
    return { status, error: err };

  }

}

// This helper takes mongoose object Id, validates it and returns the result
const isValidObjectId = async (v) => {

  try {

    // checking the length of incoming value
    if (v.length !== 12 && v.length !== 24) {
      // this code runs in case incoming value in not 12 or 24 chars long

      // returning the result to its caller
      return { status: SUCCESS, data: false };

    }

    // generating object id from incoming value 
    const objectId = new mongoose.Types.ObjectId(v).toString();

    // validating incoming value against generated object id
    const result = objectId === v;

    // returning the result to its caller
    return { status: SUCCESS, data: result };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ isValidObjectId -> auth.helpers.js`);

    // returning status and error indicating failure to its caller
    return { status: SERVER_ERROR, error: `An unhandled exception occurred on the server.` };

  }

}



// exporting helpers as modules
module.exports = {

  verifyAccessToken,
  isValidObjectId

};