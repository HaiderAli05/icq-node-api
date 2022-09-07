// importing required packages and modules
const mongoose = require(`mongoose`);
const {
  cleanPhoneNo,
  hashPassword,
} = require(`../../dependencies/helpers/mongoose.helpers`);

// importing required config params
const { CUSTOM_ID_BASE_VALUE, CUSTOM_ID_PREFIX_CHARS, USER_ID_PREFIX } = require(`../../dependencies/config`);



// defining user schema
const userSchema = new mongoose.Schema({

  _userId: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    uppercase: true,
    trim: true
  },
  lastName: {
    type: String,
    uppercase: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  phone: {
    type: String,
    set: cleanPhoneNo,
    sparse: true
  },
  // gender: {
  //   type: String,
  //   uppercase: true,
  //   trim: true
  // },
  address: {
    type: String,
    trim: true,
    uppercase: true
  },
  password: {
    type: String,
    set: hashPassword
  },
  // role: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: `Role`
  // },
  role: {
    type: String,
    trim: true,
    uppercase: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

}, {

  _id: true,
  timestamps: true

});



// pre-validate middleware for custom _userId generation and storage
userSchema.pre(`validate`, async function () {
  // this code runs just before validating the document

  // this method auto-generates and returns _userId
  const generateUserId = async () => {
    // fetching last user
    const lastUser = (
      await mongoose.model(`User`).find().limit(1).sort(`-createdAt`).lean().exec()
    )[0];

    // fetching the _userId of last user and storing it
    const lastUserId = lastUser
      ? parseInt(lastUser._userId.substring(CUSTOM_ID_PREFIX_CHARS))
      : CUSTOM_ID_BASE_VALUE;

    // calculating new user number
    const newUserId = lastUserId + 1;

    // returning _userId to its caller
    return `${USER_ID_PREFIX}${newUserId}`;
  };

  // generating and storing value for _userId field
  this._userId = await generateUserId();

});



// exporting model as module
module.exports = mongoose.model(`User`, userSchema);
