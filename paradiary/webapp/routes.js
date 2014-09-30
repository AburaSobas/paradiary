/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var 
  configRoutes,
  mongodb     = require( 'mongodb' ),
  
  mongoServer = new mongodb.Server(
    'localhost',
    mongodb.Connection.DEFAULT_PORT
  ),
  dbHandle    = new mongodb.Db(
    'paradiary', mongoServer, { safe : true }
  ),
  makeMongoID = mongodb.ObjectID;


  
// ------------- END MODULE SCOPE VARIABLES ---------------

configRoutes = function ( app, server ) {
  app.get( '/', function ( request, response ) {
    response.redirect( '/paradiary.html' );
  });
  
  app.get ( '/insert', function ( request, response ) {
    response.redirect( '/sample_insert.html' );
  });
  
  app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.charset = 'utf-8';
    response.contentType ( 'json' );
    next();
  });
  
  // -------- ˆê——Žæ“¾ --------
  app.get( '/:obj_type/list', function ( request, response ) {
    dbHandle.collection(
      request.params.obj_type,
      function ( outer_error, collection ) {
        collection.find().toArray(
          function ( inner_error, map_list ) {
            response.send( map_list );
          }
        );
      }
    );
  });
  
  // -------- ‘}“ü --------
  app.post( '/:obj_type/create', function ( request, response ) {
    dbHandle.collection(
      request.params.obj_type,
      function ( outer_error, collection ) {
        var
          options_map = { safe: true },
          obj_map = request.body;
        
        collection.insert(
          obj_map,
          options_map,
          function ( inner_error, result_map ) {
            response.send( result_map );
          }
        );
      }
    );
  });
  
};
module.exports = { configRoutes : configRoutes };

dbHandle.open( function () {
  console.log( '** Connected to MongoDB **' );
});
