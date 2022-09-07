// importing required modules
const express = require(`express`);

// importing required middlewares
const { authenticateRequest } = require(`../middlewares/authentication.middleware`);
const { grantAccessTo } = require(`../middlewares/authorization.middleware`);
const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing required permissions
const { USERS_READ, USERS_UPDATE, USERS_DELETE } = require(`../../dependencies/system-permissions`);

// importing required schemas
const { newUserSchema, specificUserSchema, userListSchema, allUsersSchema, loginUserSchema } = require(`../../dependencies/input-validation-schemas/user.schemas`);

// importing required controllers
const { addUser, loginUser, fetchSpecificUser, getAllUsers, updateUserById, deleteUserById, fetchUserList } = require(`../controllers/user.controller`);



// initting user router
const userRouter = express.Router();



// 1-> route to add a new user in the database
userRouter.post(`/signup`, validateInput(newUserSchema, `BODY`), addUser);
userRouter.post(`/login`, validateInput(loginUserSchema, `BODY`), loginUser);

// 1-> route to get all users from database as paginated list
// 2-> route to fetch a specific user from database via _id
// 3-> route to fetch all users as an array from database
userRouter.get(`/list`, authenticateRequest, grantAccessTo(USERS_READ), validateInput(userListSchema, `QUERY`), fetchUserList);
userRouter.get(`/:userId`, authenticateRequest, grantAccessTo(USERS_READ), validateInput(specificUserSchema, `PARAMS`), fetchSpecificUser);
userRouter.get(`/`, authenticateRequest, grantAccessTo(USERS_READ), validateInput(allUsersSchema, `QUERY`), getAllUsers);

// 1-> route to update a specific user in the database via _id
userRouter.patch(`/:userId`, updateUserById);

// 1-> route to delete a specific user from database via _id
userRouter.delete(`/:userId`, authenticateRequest, grantAccessTo(USERS_DELETE), validateInput(specificUserSchema, `PARAMS`), deleteUserById);



// exporting router as module
module.exports = {

  userRouter

};