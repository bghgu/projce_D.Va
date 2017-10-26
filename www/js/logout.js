angular.module('starter')

  //로그아웃
  .controller('logoutCtrl', function($scope, $location, $localstorage, $ionicLoading, $ionicPopup) {
    $scope.logout = function(data) {

      //저장소 초기화
      $localstorage.clear();
      //로그인 페이지 이동
      $location.path('/login');

      $ionicPopup.alert({
        title: 'bye bye',
        template: '로그아웃 되었습니다.'
      });

    };
  });
