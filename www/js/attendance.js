angular.module('starter')

  //나의 수업 출결 현황
  .controller('attendanceCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/user/attendance',
          url: 'https://c.youngbin.xyz/foressst/user/attendance',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('attendance', data);
          $scope.attendance = $localstorage.getObject('attendance').attendance;
          var count = $localstorage.getObject('attendance').attendance;
          if (count === 0) {
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: '수강한 과목이 없습니다.'
            });
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
