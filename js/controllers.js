/**
* pmtool.controllers Module
*
* Description
*/
angular.module('pmtool.controllers', ['relativeDate'])

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate){
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})



.controller('HomeCtrl', function($scope, $ionicModal, ItemsService){
  $ionicModal.fromTemplateUrl('templates/modal-item.html', {
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

    $scope.editItem = function(item) {
      $scope.openModal();
      $scope.item = item; 
    }

    $scope.submit = function(item) {
      if (item.hasOwnProperty("id")) {
        //alert("YTNMD");
        $scope.items[item.id].title = item.title;
        $scope.item = {};
        $scope.closeModal();
      } else {

      $scope.item = item;
      var newItem = $scope.item.title.trim();
      if (!newItem.length) {
        return;
      }
     
      var numTodos = $scope.items.length;  
      var newItem = {
        id: numTodos,
        title: $scope.item.title,
        done: false,
        tasks: [],
        createdAt: Date.now()
      }

      $scope.items.push(newItem);
      //$scope.todos.$add(newItem);
      $scope.item = {};
      $scope.closeModal();
  
      }

    };

    
    $scope.data = {
      showDelete: false
    };


    $scope.tclick = function(item) {
      console.log(item);
      item.active = item.active === false ? true: false;
      $scope.activeTasks = ItemsService.getActiveTasks();
      if (item.active === true) {
        $scope.activeTasks.push(item);
      } else {
        $scope.activeTasks.splice($scope.activeTasks.indexOf(item), 1);
      }
    }
    $scope.doneClick = function(item) {
      console.log(item);
      item.done = item.done === false ? true: false;
      $scope.activeTasks = ItemsService.getDoneTasks();
      if (item.done === true) {
        $scope.getDoneTasks.push(item);
        $scope.activeTasks.splice($scope.activeTasks.indexOf(item), 1);

      } 
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
      if (item.active === false) {
        $scope.activeTasks.splice($scope.activeTasks.indexOf(item), 1);
      }
      //$scope.acitveClass = $scope.acitveClass === 'button-assertive' ? 'button-balanced': 'button-assertive';
    }

    
    $scope.doneClick = function(item) {
      console.log(item);
      item.done = item.done === false ? true: false;
      $scope.doneTasks = ItemsService.getDoneTasks();
      if (item.done === true) {
        $scope.doneTasks.push(item);
        $scope.activeTasks.splice($scope.activeTasks.indexOf(item), 1);

      } 
    }

    
    $scope.onItemDelete = function(item) {
      $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.activeTasks = ItemsService.getActiveTasks();


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

  function saveTask(task) {
    
    $scope.task = task;
    var todo = $scope.items[$stateParams.id];
    $scope.todo = todo;
    if (!task.id) {
      task.id = $scope.todo.tasks.length + 1;
      task.epicId = $stateParams.id; 
    }

    var task = {
      active: false,
      done: false,
      epicId: task.epicId,
      id: task.id,
      title: task.title
    }
    
    //console.log(todo, task);
    if (!$scope.todo.tasks[task.id - 1]) {
      $scope.todo.tasks.push(task);
    }
    
    $scope.closeModal();
  }

  $scope.addTask = function() {
    $scope.openModal();
  }

  $scope.editTask = function(task) {
    console.log(task);
    $scope.task = task;
    $scope.openModal();

  }
  
  $scope.submit = function(task) {
    saveTask(task);
  }
  $scope.items = ItemsService.all();
  $scope.item = $scope.items[$stateParams.id];
  $scope.tasks = ItemsService.getItemTasks($stateParams.id);


})
.controller('DoneListCtrl', function($scope, $ionicModal, $stateParams, ItemsService){

  $scope.config = {
     title: 'Products',
     tooltips: true,
     labels: false,
     mouseover: function() {},
     mouseout: function() {},
     click: function() {},
     legend: {
       display: true,
       //could be 'left, right'
       position: 'right'
     }
   };

   $scope.data = {
     series: ['Items Done'],
     data: [{
       x: "M",
       y: [3],
       tooltip: "this is tooltip"
     }, {
       x: "T",
       y: [7]
     }, {
       x: "W",
       y: [11]
     }, {
       x: "Th",
       y: [4]
     }, {
       x: "F",
       y: [14]
     }]
   };
$scope.tasks = ItemsService.getDoneTasks();
});