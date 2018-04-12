angular.module('starter')

  //로그인
  .controller('loginCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {

    //자동로그인 설정
    if (($localstorage.get('id') !== undefined) && ($localstorage.get('pw') !== undefined)) {
      $ionicLoading.show();
      $http({
          method: 'post',
          url: 'https://c.youngbin.xyz/foressst/user/login',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            userid: $localstorage.get('id'),
            userpw: $localstorage.get('pw')
          })
        })
        .success(function(data) {
          console.log(data);
          if (data.length == 4) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Welcome',
              template: '자동 로그인 되었습니다.'
            });
            $localstorage.setObject('cookie', data);
            $location.path('/app/myPage');
          }
        });
    }else {
        var alertPopup = $ionicPopup.alert({
          title: '공지사항',
          template: '2018년도 신입생은 종합정보시스템의 계정을 발급받으신 후 사용하실수 있습니다.'
        });
    }

    $scope.login = function(user) {
      $ionicLoading.show();
      if (typeof(user) == 'undefined') {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '아이디를 입력해 주세요.'
        });
        return false;
      }
      if (typeof(user.password) == 'undefined') {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Warning Message',
          template: '비밀번호를 입력해 주세요.'
        });
        return false;
      }
      $http({
          method: 'post',
          url: 'https://c.youngbin.xyz/foressst/user/login',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            userid: user.username,
            userpw: user.password
          })
        })
        .success(function(data) {
          if (data.length == 4) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Welcome',
              template: '환영합니다'
            });
            //쿠키 저장
            $localstorage.setObject('cookie', data);
            //id 저장
            $localstorage.set('id', user.username);
            //pw 저장
            $localstorage.set('pw', user.password);
            $location.path('/app/myPage');
          } else if (count == 13) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Warning Message',
              template: '아이디와 비밀번호를 확인해 주세요.'
            });
            $localstorage.setObject('cookie', data);
          }
        })
        .error(function(data, status, headers, config) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
          });
        });
    };
});
