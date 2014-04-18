angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent' : {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
    .state('app.active-list', {
    url: '/list',
    views: {
      'menuContent' : {
        templateUrl: 'templates/active-list.html',
        controller: 'ActiveListCtrl'
      }
    }
  })
  .state('app.list', {
    url: '/home/:id',
    views: {
      'menuContent' : {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    }
  })
  .state('app.tab', {
    url: "/tab",
    views: {
      'menuContent' : {
        templateUrl: 'templates/tabs.html'
      }
    }
  })
  .state('app.tab-list', {
    url: "/tab-list",
    views: {
      'menuContent' : {
        templateUrl: 'templates/tabs-list.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
// Menu
.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate){
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
// List

.factory('ItemsService', function(){

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
})
.controller('HomeCtrl', function($scope, $ionicModal, ItemsService){
  
  $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });


    $scope.addItem = function () {
      $scope.item = {};
      $scope.openModal();
    };

    $scope.submit = function() {
      
      var newItem = $scope.item.title.trim();
      if (!newItem.length) {
        return;
      }
      var newItem = {
        id: $scope.items.length + 1,
        title: $scope.item.title
      }


      $scope.items.push(newItem);
      $scope.item = {};
      $scope.closeModal();
      $scope.modal.remove();

    };


  $scope.items = ItemsService.all();


  

})
.controller('ActiveListCtrl', function($scope, $ionicModal, ItemsService, $stateParams){

    //$scope.tasks = ItemsService.getItemTasks($stateParams.id);
    $scope.tasks = ItemsService.getActiveTasks();
    console.log($scope.tasks);
    $scope.data = {
      showDelete: false
    };


    $scope.tclick = function(item) {
      console.log(item);
      item.active = item.active === false ? true: false;
      //$scope.acitveClass = $scope.acitveClass === 'button-assertive' ? 'button-balanced': 'button-assertive';
    }


    
    $scope.onItemDelete = function(item) {
      $scope.items.splice($scope.items.indexOf(item), 1);
    };


})

.controller('ListCtrl', function($scope, $ionicModal, $stateParams, ItemsService){

  $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });


  $scope.data = {
    showDelete: false
  };
  
  // $scope.itemButtons = [
  //   {
  //     text: 'Edit',
  //     type: 'button-assertive',
  //     onTap: function(item) {
  //       alert('Edit Item: ' + item.id);
  //     }
  //   },
  //   {
  //     text: 'Delete',
  //     type: 'button-calm',
  //     onTap: function(item) {
  //       //alert('Share Item: ' + item.id);
  //   $scope.items.splice($scope.items.indexOf(item), 1);

  //     }
  //   }
  // ];

  $scope.tclick = function(item) {
    console.log(item);
    item.active = item.active === false ? true: false;
    //$scope.acitveClass = $scope.acitveClass === 'button-assertive' ? 'button-balanced': 'button-assertive';
  }
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.tasks = ItemsService.getItemTasks($stateParams.id);


});