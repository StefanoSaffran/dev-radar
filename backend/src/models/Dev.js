const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  github_username: {
    type: String,
  },
  bio: {
    type: String
  },
  avatar_url: {
    type: String,
  },
  techs: [{
      type: String,
  }],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
})

DevSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
});

module.exports = mongoose.model('Dev', DevSchema);