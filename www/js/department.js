angular.module('starter')

// 학과별 개설과목 조회
.controller('departmentCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  /*if ($localstorage.getObject('cookie')) {
    if (month < 7) {
      sem = "Z0101";
      //console.log(sem)
    } else {
      semr = "Z0102"
      //console.log(sem)
    }
    $http({
        method: 'post',
        url: 'http://c.youngbin.xyz/enroll/subjects',
        //url: 'https://c.youngbin.xyz/enroll/subjects',
        headers: {
          'Content-Type': 'application/json'
        },
        data: ({
          year: date.getFullYear(),
          semester: sem,
          depart: 'U050000_U050300_U050300',
          professor: '',
          cookie: $localstorage.getObject('cookie')
        })
      })
      .success(function(data, status, headers, config) {
        $localstorage.setObject('department', data);
        $scope.departments = $localstorage.getObject('department').subjects;
      })
      .error(function(data, status, headers, config) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
        });
        $location.path('/login');
      })
  } else {
    $ionicLoading.hide();
    var alertPopup = $ionicPopup.alert({
      title: 'Warning Message',
      template: '로그인 먼저 해주세요.'
    });
    $location.path('/login');
  }; */
  if ($localstorage.getObject('cookie')) {
    $scope.department = function(data) {
      $ionicLoading.show();
      if (typeof(data) == 'undefined') {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '학부(과)를 선택해 주세요'
        });
        return false;
      }
      if (typeof(data.year) == 'undefined') {
        data.year = year;
      }
      if (typeof(data.semester) == 'undefined') {
        if (month < 7) {
          data.semester = "Z0101";
        } else {
          data.semester = "Z0102";
        }
      }
      if (typeof(data.professor) == 'undefined') {
        data.professor = '';
      }
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/enroll/subjects',
          url: 'https://c.youngbin.xyz/foressst/enroll/subjects',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: data.year,
            semester: data.semester,
            depart: data.depart,
            professor: data.professor,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $localstorage.setObject('department', data);
          $ionicLoading.hide();
          $scope.departments = $localstorage.getObject('department').subjects;
          var count = $localstorage.getObject('department').subjects[0].type;
          if (count == "자료가 없습니다.") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: '자료가 없습니다.'
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
    };
  } else {
    $ionicLoading.hide();
    var alertPopup = $ionicPopup.alert({
      title: 'Warning Message',
      template: '로그인 먼저 해주세요.'
    });
    $location.path('/login');
  }
});
