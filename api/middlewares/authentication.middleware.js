// importing required packages and modules
const { logInfo, logError } = require(`../../dependencies/helpers/console.helpers`);
const { verifyAccessToken } = require(`../../dependencies/helpers/auth.helpers`);

// importing required config params
const { HTTP_STATUS_CODES: { UNAUTHORIZED, SERVER_ERROR } } = require(`../../dependencies/config`);



// this middleware authenticates incoming request and allows/rejects incoming
// request by analyzing JWT in its auth headers
const authenticateRequest = async (req, res, next) => {

  try {

    // storing the raw token from incoming request headers
    const rawAuthHeader = req.headers.authorization;

    // checking if authorization token exists in the incoming request headers
    if (!rawAuthHeader) {
      // this code runs if raw token isn't present in incoming request headers

      // logging error message to the console
      logError(`Auth token not found. Authentication failed.`);

      // returning the response with an error message
      return res.status(UNAUTHORIZED).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error: `Auth token not found. Authentication failed.`

        }

      });

    }

    // calling helper to verify access token
    const { status, data, error } = await verifyAccessToken(rawAuthHeader);

    // checking the response from helper
    if (status === SERVER_ERROR) {
      // this code runs in case of SERVER_ERROR returned

      // throwing an exception
      throw (error);

    } else if (status === UNAUTHORIZED) {
      // this code runs in case of UNAUTHORIZED

      // logging error message to the console
      logError(`Access Token is invalid. Auth Failed.`);

      // returning the response to its caller
      return res.status(UNAUTHORIZED).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error: `Authentication failed because ${error}.`

        }

      });

    }

    // fetching required data from token data
    const { sub, _franchise, gender, designation, img, account_status, system_permissions } = data;

    // appending user profile data to the request object
    req.tokenData = {

      _id: sub,
      _franchise,
      gender,
      designation,
      img,
      accountStatus: account_status,
      bearerPermissions: system_permissions

    };

    // forwarding request to the next handler 
    next();

  } catch (error) {
    // this code runs in case of an ERROR @ runtime

    // logging error messages to the console
    logError(`ERROR @ authenticateRequest -> authentication.middleware.js`, error);

    // returning response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `An unhandled exception occured on the server.`

      }

    });

  }

};



// exporting middleware as a module
module.exports = {

  authenticateRequest

};