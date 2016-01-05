'use strict';

var _ = require('lodash');
var http = require('http');
var https = require('https');
var Imagesearch = require('./imagesearch.model');
var config = require('../../config/environment');
// Get list of imagesearchs
exports.index = function(req, res) {
  Imagesearch.find(function (err, imagesearchs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(imagesearchs);
  });
};

// Get a single imagesearch
exports.show = function(req, res) {
  var baseStr = req.params.id;
  var offset = req.query.offset;

  var searchTerms = baseStr.replace(/ /g, "+");
    console.log("Das is bad " +searchTerms);
      var cx = '017728127643810685442:oziarnalkb8';
    var apikey = 'AIzaSyBFD5kTrogjexv2AQPjtSA3KETTd2_6Cwk';

     // var url = 'https://www.googleapis.com/customsearch/v1?key='+apikey+'&q=lolcats+funny&searchType=image&cx='+cx;//&searchType=image';//&cx='+cx;
      var url = 'www.googleapis.com';
      var path = '/customsearch/v1?key='+apikey+'&q='
      +searchTerms+'&searchType=image&cx='+cx+'&num=10&start='+offset;//+'&callback=JSON_CALLBACK';
//      console.log("path is " + path);
//    var url = 'https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures';
//  console.log(url+path);
var options2 = {
  port: config.port,
  method: 'POST',
  path:'/api/latest?q='+searchTerms,
  //host:'127.0.0.1'
};

http.request(options2).end();


var options = {
  hostname : url,
  path : path
}
  var callback = function(response) {
    var found = false;
    var str = "";

    response.on('end', function (d) {
      var parsed  = JSON.parse(str);
   
     var output = parsed.items.map(function (elt) {

        var item = {};
        item.link = '<a href='+elt.link+' target="_blank">'+elt.link+'</a>';
        item.snippet = elt.snippet;
        item.url = '<a href='+elt.image.contextLink+' target="_blank">'+elt.image.contextLink+'</a>';
        return item;
      });
     var htmlOutput = "<div class='container'>";
     var para = '<p style="margin-left:40px;padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px">';

     output.forEach(function(elt) {
      htmlOutput+='<div>{'+para+'"link":'+elt.link +',</p>' + 
      para+'"snippet":'+elt.snippet+',</p>' +
      '"url":'+elt.url+'</p>}</div>';
     });

      return res.send(htmlOutput);
    });
  response.on('data', function (d) {
      str+=d;
    });
  }; 

  https.get(options, callback);

/*  Imagesearch.findById(req.params.id, function (err, imagesearch) {
    if(err) { return handleError(res, err); }
    if(!imagesearch) { return res.status(404).send('Not Found'); }
    return res.json(imagesearch);
  });*/
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