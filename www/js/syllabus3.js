angular.module('starter')

//신 강의 계획서
.controller('syllabus3Ctrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
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
        data.year = year;
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
      if (data.type == "GYOSU") {
        ProfKeyword = data.keyword;
        GwamogKeyword = SosogKeyword = "";
      } else if (data.type == "GWAMOG") {
        GwamogKeyword = data.keyword;
        ProfKeyword = SosogKeyword = "";
      } else if (data.type == "HagbuNm") {
        SosogKeyword = data.keyword;
        GwamogKeyword = ProfKeyword = "";
      }
      //////////////////////
      $http({
          method: 'post',
          url: 'http://sam.skhu.ac.kr/SSE/SSEA1/SSEA104_GetList',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            Yy: data.year,
            Haggi: data.semester,
            GwamogParam: GwamogKeyword,
            ProfParam: ProfKeyword,
            SosogParam: SosogKeyword
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          //console.log(data);
          $localstorage.setObject('syllabus_3', data);
          $scope.syllabuss = $localstorage.getObject('syllabus_3').DAT;
          //////////////
          $scope.syllabus3 = function(data) {
            //console.log(data);
            $localstorage.set('order', data);
            $location.path('/app/syllabus4');
            $localstorage.get('order');
          };
          //////////////
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
