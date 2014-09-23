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
  );

dbHandle.open( function () {
  console.log( '** Connected to MongoDB **' );
});
  
// ------------- END MODULE SCOPE VARIABLES ---------------

configRoutes = function ( app, server ) {
  app.get( '/', function ( request, response ) {
    response.redirect( '/paradiary.html' );
  });
  
  app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.charset = 'utf-8';
    response.contentType ( 'json' );
    next();
  });
  
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
  
};
module.exports = { configRoutes : configRoutes };
