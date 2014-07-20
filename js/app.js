angular.module('ionicApp', ['ionic', 'pmtool.controllers', 'pmtool.services','relativeDate', 'angularCharts'])

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
  .state('app.done', {
    url: '/done',
    views: {
      'menuContent' : {
        templateUrl: 'templates/done-list.html',
        controller: 'DoneListCtrl'
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
});
