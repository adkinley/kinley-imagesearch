'use strict';

var _ = require('lodash');
var Imagesearch = require('./imagesearch.model');

// Get list of imagesearchs
exports.index = function(req, res) {
  Imagesearch.find(function (err, imagesearchs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(imagesearchs);
  });
};

// Get a single imagesearch
exports.show = function(req, res) {
  Imagesearch.findById(req.params.id, function (err, imagesearch) {
    if(err) { return handleError(res, err); }
    if(!imagesearch) { return res.status(404).send('Not Found'); }
    return res.json(imagesearch);
  });
};

// Creates a new imagesearch in the DB.
exports.create = function(req, res) {
  Imagesearch.create(req.body, function(err, imagesearch) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(imagesearch);
  });
};

// Updates an existing imagesearch in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Imagesearch.findById(req.params.id, function (err, imagesearch) {
    if (err) { return handleError(res, err); }
    if(!imagesearch) { return res.status(404).send('Not Found'); }
    var updated = _.merge(imagesearch, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(imagesearch);
    });
  });
};

// Deletes a imagesearch from the DB.
exports.destroy = function(req, res) {
  Imagesearch.findById(req.params.id, function (err, imagesearch) {
    if(err) { return handleError(res, err); }
    if(!imagesearch) { return res.status(404).send('Not Found'); }
    imagesearch.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}