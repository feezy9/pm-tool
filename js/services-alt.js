/**
* pmtool.services Module
*
* escription
*/
angular.module('pmtool.services', ['firebase'])

.factory('ItemsService', function($firebase) {
      
	  var ref = new Firebase("https://pm-tool.firebaseio.com/todos");
	  return $firebase(ref);
	});