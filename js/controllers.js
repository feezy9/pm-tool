/**
* pmtool.controllers Module
*
* Description
*/
angular.module('pmtool.controllers', [])

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate){
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
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
      $scope.todo = {};
      $scope.openModal();
    };

    $scope.submit = function() {
      
      var newItem = $scope.todo.title.trim();
      if (!newItem.length) {
        return;
      }

      var numTodos = $scope.todos.$getIndex(); 
      var newItem = {
        id: numTodos.length,
        title: $scope.todo.title,
        done: false,
        tasks: []

      }

      $scope.todos.push(newItem);
      //$scope.todos.$add(newItem);
      $scope.todo = {};
      $scope.closeModal();
      $scope.modal.remove();

    };

    
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

  	$scope.items = ItemsService.all();
 
})
.controller('ActiveListCtrl', function($scope, $ionicModal, $firebase, ItemsService){
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

    $scope.tasks = ItemsService.getActiveTasks();


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