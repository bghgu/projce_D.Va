angular.module('starter')

//교내 제출용 성적증명서
.controller('printCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
  $ionicLoading.show();
  if ($localstorage.getObject('cookie')) {
    $http({
        method: 'post',
        //url: 'http://c.youngbin.xyz/grade/certificate',
        url: 'https://c.youngbin.xyz/foressst/grade/certificate',
        headers: {
          'Content-Type': 'application/json'
        },
        data: ({
          cookie: $localstorage.getObject('cookie')
        })
      })
      .success(function(data, status, headers, config) {
        $ionicLoading.hide();
        $localstorage.setObject('print', data);
        $scope.print = $localstorage.getObject('print').details;
        $scope.sum = $localstorage.getObject('print').details[data.details.length - 1];
        var count = $localstorage.getObject('print').details.length;
        if (count === 0) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: '성적 내역이 없습니다.'
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
