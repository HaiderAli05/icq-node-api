// importing required packages and modules
const { DateTime } = require(`luxon`)
const mongoose = require(`mongoose`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { logWarning, logError } = require(`../helpers/console.helpers`);

// importing required config params
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, CONFLICT, SERVER_ERROR } } = require(`../config`);

// importing required data dependencies
const { JWT_SECRET_KEY } = require(`../credentials`);

// importing required models
const User = require(`../../api/models/user.model`);



// this data service takes in user data obj and _creater, saves 
// user in database and returns response to it's caller 
const saveUser = async (userData) => {

  try {

    // creating object to store new user 
    const newUser = new User({

      ...userData

    });

    // saving user in the database
    const result = await newUser.save();

    // returning saved response to it's caller 
    return {

      status: CREATED,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ saveUser -> user.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `user creation failed due to duplicate ${duplicateErrorFields}.` : `user creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

// this data service takes in user data obj check its credentials and returns
// jwt in response to it's caller 
const login = async (userData) => {

  try {

    // getting incoming email and password from requested data
    const inComingEmail = userData.email;
    const inComingPassword = userData.password;

    // check if user exists or not
    const user = await User.findOne({ email: inComingEmail }).lean().exec();

    if (!user) {
      // this code runs in case query didn't return anything from database

      return {

        status: BAD_REQUEST,
        error: `Invalid Credentials!`

      };

    }

    // Check if Password is correct
    const validPassword = await bcrypt.compare(inComingPassword, user.password);

    if (!validPassword) {

      return {

        status: BAD_REQUEST,
        error: `Invalid Credentials!`

      };

    }

    const { role, _id, firstName, lastName, email, phone, address } = user;

    // create and return a token to requested user
    const token = jwt.sign({ _id, email, role }, JWT_SECRET_KEY);

    // returning saved response to it's caller 
    return {

      status: SUCCESS,
      data: {
        user: {
          _id,
          role,
          firstName,
          lastName,
          email,
          phone,
          address
        },
        token
      }

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ login -> user.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `user creation failed due to duplicate ${duplicateErrorFields}.` : `user creation failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

// this data service takes in the userId, fetch the user notes via userId and returns
// the response to it's caller
const findUserById = async (userId) => {

  try {

    let pipeline = [
      {
        '$match': {
          '_id': mongoose.Types.ObjectId(userId),
          'isDeleted': false
        }
      }, {
        '$lookup': {
          'from': 'franchises',
          'let': {
            'franchiseId': '$_franchise'
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', '$$franchiseId'
                  ]
                }
              }
            }, {
              '$unwind': {
                'path': '$locations'
              }
            }, {
              '$project': {
                'name': 1,
                'location': '$locations'
              }
            }
          ],
          'as': 'franchise'
        }
      }, {
        '$lookup': {
          'from': 'franchises',
          'let': {
            'franchiseId': '$_franchise'
          },
          'pipeline': [{
            '$match': {
              '$expr': {
                '$eq': ['$_id', '$$franchiseId']
              }
            }
          }],
          'as': '_franchise'
        }
      }, {
        '$addFields': {
          '_locations': {
            '$filter': {
              'input': '$franchise',
              'as': 'loc',
              'cond': {
                '$in': [
                  '$$loc.location._id', '$_locations'
                ]
              }
            }
          }
        }
      }, {
        '$project': {
          'franchiseName': {
            '$arrayElemAt': [
              '$_locations.name', 0
            ]
          },
          'franchiseId': {
            '$arrayElemAt': [
              '$_locations._id', 0
            ]
          },
          'franchisePhone': {
            '$arrayElemAt': ['$_franchise.phone', 0]
          },
          'locationNames': {
            '$map': {
              'input': '$_locations',
              'as': 'location',
              'in': {
                'label': '$$location.location.name',
                'value': '$$location.location._id'
              }
            }
          },
          'firstName': 1,
          'middleName': 1,
          'lastName': 1,
          'img': 1,
          'designation': 1,
          'contactInfo': 1,
          'commission': 1,
          '_id': 1,
          'address': 1,
          'notes': 1,
          'gender': 1,
          'systemRoles': 1,
          'updateLogs': 1
        }
      }, {
        '$unwind': {
          'path': '$systemRoles',
          'preserveNullAndEmptyArrays': true

        }
      }, {
        '$lookup': {
          'from': 'system-roles',
          'let': {
            'systemRoles': '$systemRoles'
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', '$$systemRoles'
                  ]
                }
              }
            }, {
              '$project': {
                '_id': 0,
                'value': '$_id',
                'label': '$name'
              }
            }
          ],
          'as': 'systemRoles'
        }
      }, {
        '$addFields': {
          'systemRoles': {
            '$arrayElemAt': [
              '$systemRoles', 0
            ]
          }
        }
      }, {
        '$group': {
          '_id': '$_id',
          'franchiseName': {
            '$first': '$franchiseName'
          },
          'franchiseId': {
            '$first': '$franchiseId'
          },
          'franchisePhone': {
            '$first': '$franchisePhone'
          },
          'locationNames': {
            '$first': '$locationNames'
          },
          'firstName': {
            '$first': '$firstName'
          },
          'middleName': {
            '$first': '$middleName'
          },
          'lastName': {
            '$first': '$lastName'
          },
          'img': {
            '$first': '$img'
          },
          'contactInfo': {
            '$first': '$contactInfo'
          },
          'designation': {
            '$first': '$designation'
          },
          'commission': {
            '$first': '$commission'
          },
          'address': {
            '$first': '$address'
          },
          'notes': {
            '$first': '$notes'
          },
          'gender': {
            '$first': '$gender'
          },
          'systemRoles': {
            '$push': '$systemRoles'
          },
          'updateLogs': {
            '$first': '$updateLogs'
          }
        }
      }
    ]

    // creating object to store new user 
    const result = (await User.aggregate(pipeline).exec())[0]


    // checking the result of the query
    if (!result) {
      // this code runs in case query didn't return anything from database

      return {

        status: NOT_FOUND,
        error: `Requested data not found in database.`

      };


    }


    // returning saved response to it's caller 
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ findUserById -> user.services.js`, error);

    // setting value of status and description
    const [status, err] = [SERVER_ERROR, `user find failed`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

// this data service fetch all the users from the database and returns them
const findUsers = async (queryMetadata) => {

  try {

    // fetching required data from query meta data
    let { search, sort, page = 0, offset = 0 } = queryMetadata;

    sort = JSON.parse(sort)

    // 1-> setting sorting field and direction
    // 2-> calculating query start record
    // 3-> calculating the number of records in the current drawing of data
    const [sortAndOrder, startRecord, noOfRecords] = [{ [sort ? sort.replace(`-`, ``) : `createdAt`]: sort && !sort.startsWith(`-`) ? 1 : -1 }, parseInt(page) <= 1 ? 0 : parseInt((parseInt(page) - 1) * parseInt(offset)), !offset ? 50 : parseInt(offset) <= 0 ? 1 : parseInt(offset)];

    // parsing and fetching data from incoming stringified JSON
    const { query } = JSON.parse(search);

    console.log(query)
    // creating search query according to the incoming search params
    const searchQuery = {

      $or: [
        { firstName: new RegExp(query, `i`) },
        { lastName: new RegExp(query, `i`) },
        { phone: new RegExp(query, `i`) },
        { email: new RegExp(query, `i`) },
        { systemRoles: new RegExp(query, `i`) },
        { lobs: new RegExp(query, `i`) },
        { [`_franchise.name`]: new RegExp(query, `i`) },
        { [`_franchise.locations`]: new RegExp(query, `i`) }
      ]

    };

    console.log("search query ", searchQuery)

    let pipeline = [
      {
        '$match': {
          isDeleted: false
        }
      }, {
        '$lookup': {
          'from': 'franchises',
          'let': {
            'franchiseId': '$_franchise',
            'locations': '$_locations'
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', '$$franchiseId'
                  ]
                }
              }
            }, {
              '$addFields': {
                'locations': {
                  '$filter': {
                    'input': '$locations',
                    'as': 'loc',
                    'cond': {
                      '$in': [
                        '$$loc._id', '$$locations'
                      ]
                    }
                  }
                }
              }
            }, {
              '$project': {
                'franchiseId': 1,
                'name': '$name',
                'locations': '$locations.name'
              }
            }
          ],
          'as': '_franchise'
        }
      }, {
        '$project': {
          '_franchise': {
            '$arrayElemAt': [
              '$_franchise', 0
            ]
          },
          'firstName': 1,
          'middleName': 1,
          'lastName': 1,
          'img': 1,
          'designation': 1,
          'contactInfo': 1,
          'commission': 1,
          '_id': 1,
          'systemRoles': 1,
          'accountStatus': 1,
          createdAt: 1
        }
      }, {
        '$unwind': {
          'path': '$systemRoles',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'system-roles',
          'let': {
            'systemRoles': '$systemRoles'
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', '$$systemRoles'
                  ]
                }
              }
            }, {
              '$project': {
                '_id': 0,
                'value': '$_id',
                'label': '$name'
              }
            }
          ],
          'as': 'systemRoles'
        }
      }, {
        '$addFields': {
          'systemRoles': {
            '$arrayElemAt': [
              '$systemRoles', 0
            ]
          }
        }
      }, {
        '$group': {
          '_id': '$_id',
          '_franchise': {
            '$first': '$_franchise'
          },
          'firstName': {
            '$first': '$firstName'
          },
          'middleName': {
            '$first': '$middleName'
          },
          'lastName': {
            '$first': '$lastName'
          },
          'img': {
            '$first': '$img'
          },
          'contactInfo': {
            '$first': '$contactInfo'
          },
          'commission': {
            '$first': '$commission'
          },
          'systemRoles': {
            '$push': '$systemRoles'
          },
          'createdAt': {
            '$first': '$createdAt'
          }
        }
      }, {
        $match: {
          ...searchQuery
        }
      }, {
        '$facet': {
          'totalPages': [
            {
              '$count': 'total'
            },
            {
              '$project': {
                'totalPages': {
                  '$ceil': {
                    '$divide': ['$total', noOfRecords]
                  }
                }
              }
            }
          ],
          'totalRecords': [
            {
              '$count': 'total'
            }
          ],
          'users': [
            {
              '$sort': sortAndOrder
            },
            {
              '$skip': startRecord
            },
            {
              '$limit': noOfRecords
            }
          ]
        }
      },
      {
        '$project': {
          'totalPages': {
            '$arrayElemAt': ['$totalPages', 0]
          },
          'totalRecords': {
            '$arrayElemAt': ['$totalRecords', 0]
          },
          'users': 1
        }
      },
      {
        '$project': {
          'totalPages': '$totalPages.totalPages',
          'totalRecords': '$totalRecords.total',
          'users': 1
        }
      }

    ];

    // querying database for all users
    const { totalPages = 0, totalRecords = 0, users } = (await User.aggregate(pipeline).exec())[0];

    // returning saved users to its caller
    return {

      status: SUCCESS,
      data: {

        totalPages,
        currentPage: parseInt(page),
        totalRecords,
        currentPageRecords: users.length,
        users

      }

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findUsers -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

// this data service takes in the user data obj, find the user via userId and
// updates it and returns the response
const findUserByIdAndUpdate = async (updateData, userId, _updater) => {

  try {

    // creating an obj to store query config params
    const configParams = {

      new: true,
      runValidators: true

    };
    let updatedData = updateData
    console.log("Update Data ", updateData)

    let contactInfoKey = {
      email: "",
      phone: "",
      workPhone: "",
      workPhoneExt: "",
      fax: ""
    }
    let missingObject = []
    let contactInfo = {}

    if (updateData.contactInfo) {
      missingObject = Object.keys(contactInfoKey).filter(key => !updateData.contactInfo.hasOwnProperty(key));
      const prevObj = await User.findOne({ _id: userId }).select(`contactInfo`)
      console.log("prevObj ", prevObj.contactInfo, missingObject)

      for (key in prevObj.contactInfo) {
        // Object.getOwnPropertyNames(prevObj.contactInfo).map(key=>{
        console.log("key s", key)
        if (missingObject.includes(key)) {
          console.log(key)
          updatedData.contactInfo[key] = prevObj.contactInfo[key]
        }
      }
    }


    console.log("updated Data ", updatedData)

    // querying database for the requested user
    const result = await User.findOneAndUpdate({ _id: userId, isDeleted: false }, updatedData, configParams).lean().exec();

    // checking the result of the query
    if (!result) {
      // this code runs in case query didn't return anything from database

      return {

        status: NOT_FOUND,
        error: `Requested data not found in database.`

      };

    }

    // returning fetched data to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findUserByIdAndUpdate -> user.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `User update failed due to duplicate ${duplicateErrorFields}.` : `User update failed.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}



// exporting as modules
module.exports = {

  saveUser,
  login,
  findUserById,
  findUsers,
  findUserByIdAndUpdate

};