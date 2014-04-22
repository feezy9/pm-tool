/**
* pmtool.services Module
*
* escription
*/
angular.module('pmtool.services', ['firebase'])

.factory('ItemsService', function($firebase){

  var items = [
    { id: 0, title: "this item 1", done: false, 
    tasks: [
      { id: 1, title: "this task 1a", done: false, active: false, epicId: 0 },
      { id: 2, title: "this task 2", done: false, active: true, epicId: 0 },
      { id: 3, title: "this task 3", done: false, active: false, epicId: 0 },
      { id: 4, title: "this task 4", done: false, active: false, epicId: 0 },
      { id: 5, title: "this task 5", done: false, active: true, epicId: 0 }
  ]},
    { id: 1, title: "this item 2", done: false, 
    tasks: [
      { id: 1, title: "this task 1", done: false, active: true, epicId: 1 },
      { id: 2, title: "this task 2", done: false, active: false, epicId: 1 },
      { id: 3, title: "this task 3", done: false, active: false, epicId: 1 },
      { id: 4, title: "this task 4", done: false, active: false, epicId: 1 },
      { id: 5, title: "this task 5", done: false, active: true, epicId: 1 }
  ]},
    { id: 2, title: "this item 3", done: false, 
    tasks: [
      { id: 1, title: "this task 1", done: false, active: false, epicId: 2 },
      { id: 2, title: "this task 2", done: false, active: true, epicId: 2 },
      { id: 3, title: "this task 3", done: false, active: true, epicId: 2 },
      { id: 4, title: "this task 4", done: false, active: false, epicId: 2},
      { id: 5, title: "this task 5", done: false, active: false, epicId: 2 }
  ]},
    { id: 3, title: "this item 4", done: false, 
    tasks: [
      { id: 1, title: "this task 1", done: false, active: false, epicId: 3 },
      { id: 2, title: "this task 2", done: false, active: false, epicId: 3 },
      { id: 3, title: "this task 3", done: false, active: false, epicId: 3 },
      { id: 4, title: "this task 4", done: false, active: true, epicId: 3 },
      { id: 5, title: "this task 5", done: false, active: true, epicId: 3 }
  ]},
    { id: 4, title: "this item 5", done: false, 
    tasks: [
      { id: 1, title: "this task 1", done: false, active: true, epicId: 4 },
      { id: 2, title: "this task 2", done: false, active: true, epicId: 4 },
      { id: 3, title: "this task 3", done: false, active: false, epicId: 4 },
      { id: 4, title: "this task 4", done: false, active: false, epicId: 4 },
      { id: 5, title: "this task 5", done: false, active: false, epicId: 4 }
  ]}
  ];


  return {
    all: function (){
      return items; 
    },
    getItemTasks: function (id) {
      return items[id].tasks;
    },
    getActiveTasks: function () {
      var taskArr = [];
      angular.forEach(items, function(i) {
      
      var activeTasks = i.tasks.filter(function(t) {return t.active === true});
      activeTasks.forEach(function(t) {taskArr.push(t)})
      //taskArr.push(activeTasks);
      })
      return taskArr;

    }
  } 
});