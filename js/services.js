/**
* pmtool.services Module
*
* escription
*/
angular.module('pmtool.services', ['firebase'])

.service('ItemsService', function($firebase) {
      
	  return $firebase( new Firebase("https://pm-tool.firebaseio.com/todos") );
      // var todos = $firebase( new Firebase("https://pm-tool.firebaseio.com/todos") );
      // return {
      // 	all: function() {
      // 		return todos;
      // 	} 
      // }
});