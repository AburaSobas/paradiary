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
var configRoutes;
// ------------- END MODULE SCOPE VARIABLES ---------------

configRoutes = function ( app, server ) {
  app.get( '/', function ( request, response ) {
    response.redirect( '/paradiary.html' );
  });
};
module.exports = { configRoutes : configRoutes };
