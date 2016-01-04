'use strict';

var _ = require('lodash');
var Latest = require('./latest.model');

// Get list of latests
exports.index = function(req, res) {
  Latest.find(function (err, latests) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(latests);
  });
};

// Get a single latest
exports.show = function(req, res) {
  Latest.findById(req.params.id, function (err, latest) {
    if(err) { return handleError(res, err); }
    if(!latest) { return res.status(404).send('Not Found'); }
    return res.json(latest);
  });
};

// Creates a new latest in the DB.
exports.create = function(req, res) {
  Latest.create(req.body, function(err, latest) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(latest);
  });
};

// Updates an existing latest in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Latest.findById(req.params.id, function (err, latest) {
    if (err) { return handleError(res, err); }
    if(!latest) { return res.status(404).send('Not Found'); }
    var updated = _.merge(latest, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(latest);
    });
  });
};

// Deletes a latest from the DB.
exports.destroy = function(req, res) {
  Latest.findById(req.params.id, function (err, latest) {
    if(err) { return handleError(res, err); }
    if(!latest) { return res.status(404).send('Not Found'); }
    latest.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}