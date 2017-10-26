angular.module('starter')


  // 학사 일정 조회
  .controller('calendarCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year,
            month: month % 12,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar1', data);
          $scope.calendar1 = $localstorage.getObject('calendar1').calendar;
          $scope.month1 = month % 12;
        });
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/life/schedules',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year,
            month: (month + 1) % 12,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar2', data);
          $scope.calendar2 = $localstorage.getObject('calendar2').calendar;
          $scope.month2 = (month + 1) % 12;
        });
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/life/schedules',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year,
            month: (month + 2) % 12,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar3', data);
          $scope.calendar3 = $localstorage.getObject('calendar3').calendar;
          if ((month + 2) % 12 == 0) {
            $scope.month3 = 12;
          } else {
            $scope.month3 = (month + 2) % 12;
          }
        })
        .error(function(data, status, headers, config) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
          });
          $location.path('/login');
        });
    } else {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: '로그인 먼저 해주세요.'
      });
      $location.path('/login');
    }
});
