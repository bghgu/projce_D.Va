angular.module('starter')


  // 학사 일정 조회
  .controller('calendarCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    var date = new Date();
    var month1 = date.getMonth() + 1;
    var year1 = date.getFullYear();
    var month2 = month1 + 1;
    var year2 = date.getFullYear();
    var month3 = month2 + 1;
    var year3 = date.getFullYear();
    //현재 11월일 경우
    if(month1 == 11) {
        month2 = 12;
        month3 = 1;
        year3 = year3 + 1;
    }
    //현재 12월일 경우
    else if(month1 == 12) {
        month2 = 1;
        year2 = year2 + 1;
        month3 = 2;
        year3 = year3 + 1;
    }

    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year1,
            month: month1,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar1', data);
          $scope.calendar1 = $localstorage.getObject('calendar1').calendar;
          $scope.month1 = month1;
        });
      $http({
          method: 'post',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year2,
            month: month2,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar2', data);
          $scope.calendar2 = $localstorage.getObject('calendar2').calendar;
          $scope.month2 = month2;
        });
      $http({
          method: 'post',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year3,
            month: month3,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar3', data);
          $scope.calendar3 = $localstorage.getObject('calendar3').calendar;
          $scope.month3 = month3;
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
