angular.module('starter')

//시간표 조회
.controller('timetableCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
  $ionicLoading.show();

  if ($localstorage.getObject('cookie')) {
    $http({
        method: 'post',
        //url: 'http://c.youngbin.xyz/class/timetable',
        url: 'https://c.youngbin.xyz/foressst/class/timetable',
        headers: {
          'Content-Type': 'application/json'
        },
        data: ({
          cookie: $localstorage.getObject('cookie')
        })
      })
      .success(function(data, status, headers, config) {
        $ionicLoading.hide();
        $localstorage.setObject('timetable', data);
        $scope.timetables_mon = $localstorage.getObject('timetable').monday;
        $scope.timetables_tues = $localstorage.getObject('timetable').tuesday;
        $scope.timetables_wedns = $localstorage.getObject('timetable').wednsday;
        $scope.timetables_thurs = $localstorage.getObject('timetable').thursday;
        $scope.timetables_fri = $localstorage.getObject('timetable').friday;
        var a = $localstorage.getObject('timetable').monday;
        var b = $localstorage.getObject('timetable').tuesday;
        var c = $localstorage.getObject('timetable').wednsday;
        var d = $localstorage.getObject('timetable').thursday;
        var e = $localstorage.getObject('timetable').friday;
        if (a === 0 && b === 0 && c === 0 & d === 0 & e === 0) {
          $ionicPopup.alert({
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
