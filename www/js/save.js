angular.module('starter')

//학점 세이브 조회
.controller('saveCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  $ionicLoading.show();
  if ($localstorage.getObject('cookie')) {
    $http({
        method: 'post',
        //url: 'http://c.youngbin.xyz/enroll/saved_credits',
        url: 'https://c.youngbin.xyz/foressst/enroll/saved_credits',
        headers: {
          'Content-Type': 'application/json'
        },
        data: ({
          cookie: $localstorage.getObject('cookie')
        })
      })
      .success(function(data, status, headers, config) {
        $ionicLoading.hide();
        $localstorage.setObject('save', data);
        var count = $localstorage.getObject('save').details.length;
        if (count === 0) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: '자료가 없습니다.'
          });
        } else {
          $scope.save = $localstorage.getObject('save').status;
          $scope.details = $localstorage.getObject('save').details;
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
