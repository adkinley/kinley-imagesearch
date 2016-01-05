'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LatestSchema = new Schema({
  searchString: String,
  updated: {type: Date, default:Date.now},
  active: Boolean
});

module.exports = mongoose.model('Latest', LatestSchema);