angular.module('starter')

//장학 신청 결과
.controller('scholarshipResultCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  $ionicLoading.show();
  if ($localstorage.getObject('cookie')) {
    $http({
        method: 'post',
        //url: 'http://c.youngbin.xyz/scholarship/result',
        url: 'https://c.youngbin.xyz/foressst/scholarship/result',
        headers: {
          'Content-Type': 'application/json'
        },
        data: ({
          cookie: $localstorage.getObject('cookie')
        })
      })
      .success(function(data, status, headers, config) {
        $ionicLoading.hide();
        $localstorage.setObject('scholarshipResult', data);
        $scope.scholarshipResult = $localstorage.getObject('scholarshipResult').apply_history;
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
