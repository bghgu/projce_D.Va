angular.module('starter')

  //상담 이력 조회
  .controller('consultingCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/life/consulting',
          url: 'https://c.youngbin.xyz/foressst/life/consulting',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('consulting', data);
          $scope.adviser = $localstorage.getObject('consulting').adviser;
          $scope.history = $localstorage.getObject('consulting').history;
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
