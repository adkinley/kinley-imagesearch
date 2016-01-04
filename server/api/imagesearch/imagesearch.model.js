'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImagesearchSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Imagesearch', ImagesearchSchema);