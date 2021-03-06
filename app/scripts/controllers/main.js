'use strict';

/**
 * @ngdoc function
 * @name istaAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the istaAngularApp
 */
angular.module('istaAngularApp')
  .controller('MainCtrl', function($scope, $routeParams, session, PersonService) {
    $scope.selected = false;
    $scope.sessions = session.query({
      date: $routeParams.id
    });
    $scope.rotating = [];
    $scope.addSession = function(session, $event, $index) {
      $event.preventDefault();
      new PersonService().$save({
        id: session.id,
        isSelected: !session.isSelected
      }, function() {
        $scope.rotating[$index] = '';
        session.isSelected = !session.isSelected;
      }, function() {
        $scope.rotating[$index] = '';
      });
      $scope.rotating[$index] = 'fa-spin fa-spinner';

    };
    $scope.isSelected = function(isSelected) {
      if (isSelected) {
        return 'session-added';
      } else {
        return 'not-added';
      }
    };
    $scope.filterSessions = function(willFilter) {
      $scope.selected = willFilter;
    };
    $scope.getSelectedAgendaClass = function(myAgenda) {
      if (($scope.selected && myAgenda) || (!$scope.selected && !myAgenda)) {
        return 'panel-link-active';
      } else {
        return '';
      }
    };
    $scope.getTrackClass = function(track) {
      return track.replace(' ', '-').toLowerCase();
    };
    $scope.lTime = 0;
    $scope.isChangedTime = function(cTime) {
      if ($scope.lTime !== cTime) {
        $scope.lTime = cTime;
        return true;
      }
      return false;
    };

    $scope.isRotating = function($index) {
      return $scope.rotating[$index];
    };
  })
  .filter('isSelectedElement', function() {
    return function(items, isSelected) {
      if (!isSelected) {
        return items;
      }
      var res = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].isSelected) {
          res.push(items[i]);
        }
      }
      return res;
    };
  });
