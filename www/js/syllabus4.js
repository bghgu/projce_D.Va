angular.module('starter')


  //신 강의 계획서 조회
  .controller('syllabus4Ctrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    //console.log($localstorage.getObject('syllabus_3').DAT[$localstorage.get('order')]);
    if ($localstorage.getObject('syllabus_3').DAT[$localstorage.get('order')]) {
      $ionicLoading.show();
      let RequestVerificationToken = "NXi6vUCuWCGVCMVwk7Fx3d46-DZJp9iQcnonZp7vZ7XLSxe-VMI2YHdY4IJgt13ZIPKr584gGKgN1teK7vejIZ2ig-VaBrZQUjDHGyKVb981:miTODDf0AwEFS9tUQoyUlVh74v6xQMfahVwkY0k1xjjIi6_bn7S--DEUYQFdSqNagTUSf9moa4yXN5mfzTZ7gxDmpAnozsbJdWjyDPkJfb01";
      //////////////////////
      $http({
          method: 'post',
          //url: 'http://sam.skhu.ac.kr/SSE/SSEA1/SSEA102_Get강의계획서',
          //url: 'http://sam.skhu.ac.kr/SSE/SSEA1/SSEA102_Get%EA%B0%95%EC%9D%98%EA%B3%84%ED%9A%8D%EC%84%9C',
          url: 'http://sam.skhu.ac.kr/SSE/SSEA1/SSEA102_Get%EA%B0%95%EC%9D%98%EA%B3%84%ED%9A%8D%EC%84%9C',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'ko',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json; charset=utf-8',
            'RequestVerificationToken': RequestVerificationToken,
            'X-Requested-With': 'XMLHttpRequest',
          },
          data: ({
            ActionMode: "R",
            Yy: $localstorage.getObject('syllabus_3').DAT[$localstorage.get('order')].Yy,
            Haggi: $localstorage.getObject('syllabus_3').DAT[$localstorage.get('order')].Haggi,
            GwamogCd: $localstorage.getObject('syllabus_3').DAT[$localstorage.get('order')].GwamogCd,
            Bunban: $localstorage.getObject('syllabus_3').DAT[$localstorage.get('order')].Bunban,
            주별내용count: 30
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          console.log(data);
          $localstorage.setObject('syllabus4', data);
          $ionicPopup.alert({
            title: '강의계획서',
            template: $localstorage.getObject('syllabus4').DAT.GwamogKorNm
          });
          $scope.syllabuss = $localstorage.getObject('syllabus4').DAT;
          $scope.weekly = JSON.parse($localstorage.getObject('syllabus4').DAT.주별내용);
          $scope.assessment = JSON.parse($localstorage.getObject('syllabus4').DAT.평가방법);
          $scope.develop = JSON.parse($localstorage.getObject('syllabus4').DAT.개발가능역량);
          ////////////
          //console.log(JSON.parse($localstorage.getObject('syllabus4').DAT.주별내용));
          //console.log(JSON.parse($localstorage.getObject('syllabus4').DAT.평가방법));
          //console.log(JSON.parse($localstorage.getObject('syllabus4').DAT.개발가능역량));
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
    } else {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: '로그인 먼저 해주세요.'
      });
      $location.path('/login');
    }
});
