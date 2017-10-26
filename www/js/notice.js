angular.module('starter')

  //공지사항
  .controller('noticesCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'get',
          url: 'https://skhu-sss.github.io/foressst/feed.json',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $localstorage.setObject('notices', data);
          console.log(notices);
          // 리턴
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
