angular.module('starter')

// 강의 계획서
.controller('syllabus2Ctrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
  if ($localstorage.getObject('syllabus').syllabus[$localstorage.get('order')].url) {
    $ionicLoading.show();
    $http({
        method: 'post',
        //url: 'http://c.youngbin.xyz/page/syllabus_details',
        url: 'https://c.youngbin.xyz/foressst/page/syllabus_details',
        headers: {
          'Content-Type': 'application/json'
        },
        data: ({
          url: $localstorage.getObject('syllabus').syllabus[$localstorage.get('order')].url,
          cookie: $localstorage.getObject('cookie')
        })
      })
      .success(function(data, status, headers, config) {
        console.log(data);
        $ionicLoading.hide();
        $localstorage.setObject('syllabus2', data);
        $ionicPopup.alert({
          title: '강의계획서',
          template: $localstorage.getObject('syllabus2').about.subject
        });
        $scope.about = $localstorage.getObject('syllabus2').about;
        $scope.info = $localstorage.getObject('syllabus2').info;
        $scope.details = $localstorage.getObject('syllabus2').details;
      })
      .error(function(data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
        });
        //$location.path('/login');
      });
    $ionicLoading.hide();
  } else {
    $ionicLoading.hide();
    var alertPopup = $ionicPopup.alert({
      title: 'Warning Message',
      template: '로그인 먼저 해주세요.'
    });
    //$location.path('/login');
  }
});
