angular.module('starter')

//장학 내역 조회
.controller('scholarshipListCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
  $ionicLoading.show();
  if ($localstorage.getObject('cookie')) {
    $http({
        method: 'post',
        //url: 'http://c.youngbin.xyz/scholarship/history',
        url: 'https://c.youngbin.xyz/foressst/scholarship/history',
        headers: {
          'Content-Type': 'application/json'
        },
        data: ({
          cookie: $localstorage.getObject('cookie')
        })
      })
      .success(function(data, status, headers, config) {
        $ionicLoading.hide();
        console.log(data);
        $localstorage.setObject('scholarshipList', data);
        $scope.scholarshipList = $localstorage.getObject('scholarshipList').scholarship_history;
        var count = $localstorage.getObject('scholarshipList').scholarship_history.length;
        if (count === 0) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: '장학내역이 없습니다 ㅠㅠ'
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
