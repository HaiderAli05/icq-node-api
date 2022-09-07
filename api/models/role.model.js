// importing required modules
const mongoose = require(`mongoose`);



// defining system role schema
const roleSchema = new mongoose.Schema({

  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    uppercase: true,
    trim: true,
    unique: true,
    default: null
  },
  description: {
    type: String,
    uppercase: true,
    trim: true,
    default: null
  },
  permissions: {
    type: [String],
    default: []
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

}, {

  _id: true,
  timestamps: true

});



// exporting schema model as a module
module.exports = mongoose.model('Role', roleSchema, `roles`);