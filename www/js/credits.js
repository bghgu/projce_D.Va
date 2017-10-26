angular.module('starter')

  //마이 페이지
  .controller('creditsCtrl', function($scope, $http, $location, $localstorage, $ionicLoading, $ionicPopup) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          url: 'https://c.youngbin.xyz/foressst/user/credits',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data) {
          $ionicLoading.hide();
          $localstorage.setObject('credits', data);
          $scope.sum = 0;
          for (var i = 0; i < data.credits.length; i++) {
            $scope.sum += Number(($localstorage.getObject('credits').credits[i].earned)) / 2;
          }
          $scope.rating = $localstorage.getObject('credits').credits;
          $scope.rest = (130 - $scope.sum);
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
