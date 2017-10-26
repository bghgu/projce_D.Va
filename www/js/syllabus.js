angular.module('starter')

// 강의 계획서 조회
.controller('syllabusCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  if ($localstorage.getObject('cookie')) {
    $scope.syllabus = function(data) {
      $ionicLoading.show();
      if (typeof(data) == 'undefined') {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '구분을 선택해 주세요.'
        });
        return false;
      }
      if (typeof(data.year) == 'undefined') {
        data.year = 2016;
      }
      if (typeof(data.semester) == 'undefined') {
        if (month < 7) {
          data.semester = "Z0101";
        } else {
          data.semester = "Z0102";
        }
      }
      if (typeof(data.keyword) == 'undefined') {
        if (data.type == "GYOSU") {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '교수명을 입력해 주세요'
          });
          return false;
        }
        if (data.type == "GWAMOG") {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '과목명을 입력해 주세요'
          });
          return false;
        }
        if (data.type == "HagbuNm") {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '학부(과)명을 입력해 주세요'
          });
          return false;
        }
      }
      //////////////////////
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/class/syllabus',
          url: 'https://c.youngbin.xyz/foressst/class/syllabus',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: data.year,
            semester: data.semester,
            type: data.type,
            keyword: data.keyword,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('syllabus', data);
          var count = $localstorage.getObject('syllabus').syllabus[0].code;
          if (count == "자료가 없습니다.") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: '자료가 없습니다.'
            });
          }
          ///////////////////////////////
          $scope.syllabus2 = function(data) {
            $localstorage.set('order', data);
            $location.path('/app/syllabus2');
          };
          ///////////////////////////////
          $scope.syllabuss = $localstorage.getObject('syllabus').syllabus;
        })
        .error(function(data) {
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
