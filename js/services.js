/**
* pmtool.services Module
*
* escription
*/
angular.module('pmtool.services', ['firebase'])

.factory('ItemsService', function($firebase){

  var items = [
    { id  : 0, title: "The Item 1", done: false, createdAt: 1402333253323,
    tasks : [
    { id  : 1, title: "this task 1a", done: false, active: false, epicId: 0, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 2, title: "this task 2", done: true, active: true, epicId: 0, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 3, title: "this task 3", done: false, active: false, epicId: 0, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 4, title: "this task 4", done: false, active: false, epicId: 0, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 5, title: "this task 5", done: false, active: true, epicId: 0, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 }
  ]},
    { id  : 1, title: "The Item 2", done: false, createdAt: 1402333253323,
    tasks : [
    { id  : 1, title: "this task 1", done: false, active: true, epicId: 1, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 2, title: "this task 2", done: true, active: false, epicId: 1, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 3, title: "this task 3", done: false, active: false, epicId: 1, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 4, title: "this task 4", done: false, active: false, epicId: 1, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 5, title: "this task 5", done: false, active: true, epicId: 1, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 }
  ]},
    { id  : 2, title: "The Item 3", done: false, createdAt: 1402333253323,
    tasks : [
    { id  : 1, title: "this task 1", done: false, active: false, epicId: 2, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 2, title: "this task 2", done: false, active: true, epicId: 2, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 3, title: "this task 3", done: true, active: true, epicId: 2, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 4, title: "this task 4", done: false, active: false, epicId: 2, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 5, title: "this task 5", done: false, active: false, epicId: 2, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 }
  ]},
    { id  : 3, title: "The Item 4", done: false, createdAt: 1402333253323,
    tasks : [
    { id  : 1, title: "this task 1", done: false, active: false, epicId: 3, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 2, title: "this task 2", done: false, active: false, epicId: 3, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 3, title: "this task 3", done: false, active: false, epicId: 3, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 4, title: "this task 4", done: false, active: true, epicId: 3, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 5, title: "this task 5", done: false, active: true, epicId: 3, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 }
  ]},
    { id  : 4, title: "The Item 5", done: false, createdAt: 1402333253323,
    tasks : [
    { id  : 1, title: "this task 1", done: false, active: true, epicId: 4, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 2, title: "this task 2", done: false, active: true, epicId: 4, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 3, title: "this task 3", done: false, active: false, epicId: 4, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 4, title: "this task 4", done: false, active: false, epicId: 4, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 },
    { id  : 5, title: "this task 5", done: false, active: false, epicId: 4, desc: "some text for this task", createdAt: 1402333253323, completedAt: 1402333253323 }
  ]}
  ];

  var remote_items = $firebase( new Firebase("https://pm-tool.firebaseio.com/todos") );



  return {
    all: function (){
      return items; 
    },
    getItemTasks: function (id) {
      return items[id].tasks;
    },
    getActiveTasks: function () {
      //console.log(items);
      var taskArr = [];
      angular.forEach(items, function(i) {
        var activeTasks = i.tasks.filter(function(t) {return t.active === true});
        activeTasks.forEach(function(t) {taskArr.push(t)})
      })
      return taskArr;

    },
        getDoneTasks: function () {
      //console.log(items);
      var taskArr = [];
      angular.forEach(items, function(i) {
        var activeTasks = i.tasks.filter(function(t) {return t.done === true});
        activeTasks.forEach(function(t) {taskArr.push(t)})
      })
      return taskArr;

    }
  } 
});