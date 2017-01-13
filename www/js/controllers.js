angular.module('starter.controllers', ['starter.services'])

//로그인
.controller('loginCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage){
    //자동로그인 설정
    /*if(($localstorage.get('id') != undefined ) && ($localstorage.get('pw') != undefined)) {
      var alertPopup = $ionicPopup.alert({
          title: 'Welcome',
          template: '자동 로그인 되었습니다.'
      });
      //페이지이동
      $location.path('/app/myPage');
    }*/

    $scope.login = function(user) {
      //로딩 표시
     $ionicLoading.show();

     //아이디를 입력하지 않았을 때
     if(typeof(user)=='undefined'){
       //로딩 종료
       $ionicLoading.hide();
       console.log(user);
       //팝업 띄우기
       var alertPopup = $ionicPopup.alert({
         //팝업이름
        title: 'Warning Message',
        //팝업 메세지
        template: '아이디를 입력해 주세요.'
      });
       return false;
     }

     //비밀번호를 입력하지 않았을 때
     if(typeof(user.password)=='undefined'){
       $ionicLoading.hide();
       console.log(user);
       var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: '비밀번호를 입력해 주세요.'
      });
       return false;
     }

     //소프과 학인
     if(user.username == "201232016"){
       $ionicLoading.hide();
       console.log(user.username);
       //팝업 띄우기
       var alertPopup = $ionicPopup.alert({
         //팝업이름
        title: 'Warning Message',
        //팝업 메세지
        template: '실험.'
      });
       return false;
     }

     //로그인 기능 실행
     $http({
       method: 'post',
       //일반통신
       url: 'http://c.youngbin.xyz/user/login',
       //ssl통신
       //url: 'https://f.youngbin.xyz/user/login',
       headers: {'Content-Type': 'application/json'},
       data: ({ userid: user.username, userpw: user.password })
     })
     .success(function(data) {
       //로그인 성공 유무 판단
       var count = data.length
       console.log(user);

       //로그인 성공
       if(count == 4) {
         $ionicLoading.hide();

         var alertPopup = $ionicPopup.alert({
          title: 'Welcome',
          template: '환영합니다.'
          });

         $localstorage.setObject('cookie', data);
         $localstorage.set('id', user.username);
         $localstorage.set('pw', user.password);

         //마이 페이지로 이동
         //$location.path('/app/myPage');
       }

       //로그인 실패
       else if(count == 13) {
         $ionicLoading.hide();

         var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '아이디와 비밀번호를 확인해 주세요.'
          });

         $localstorage.setObject('cookie', data);
       }
       })
       //서버와의 통신이 정상적이지 않을 때
       .error(function(data, status, headers, config) {
         $ionicLoading.hide();

         var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
          });
       });
     };
})

//로그아웃
.controller('logoutCtrl', function($scope, $location, $localstorage, $ionicLoading, $ionicPopup){
   $scope.logout = function(data) {
    //저장소 초기화
    $localstorage.clear();
    $location.path('/login');

    var alertPopup = $ionicPopup.alert({
      title: 'bye bye',
      template: '로그아웃 되었습니다.'
      });
   }
})

//마이 페이지
.controller('creditsCtrl', function($scope, $http, $location, $localstorage, $ionicLoading, $ionicPopup) {
  $ionicLoading.show();
  //쿠키값이 저장되있을때
  if($localstorage.getObject('cookie')){
    //http통신
    $http({
      method: 'post',
      url: 'http://c.youngbin.xyz/user/credits',
      //ssl통신 주소
      //url: 'https://f.youngbin.xyz/user/credits',
      //헤더
      headers: {'Content-Type': 'application/json'},
      //값
      data: ({ cookie: $localstorage.getObject('cookie') })
    })
    //성공적으로 정보를 받아올 경우
    .success(function(data){
      $ionicLoading.hide();
      //json값 저장
      $localstorage.setObject('credits', data);
      $scope.sum = 0;
      //값을 변수에 할당
      for(var i = 0; i<data.credits.length; i++){
        $scope.sum += Number(($localstorage.getObject('credits').credits[i].earned))/2;
      };
      $scope.rating = $localstorage.getObject('credits').credits;
      $scope.rest = (130-$scope.sum);
    })
    //서버와 통신이 정상적이지 않을 때
    .error(function(data, status, headers, config){
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
          });
      $location.path('/login');
    })}
    else {
    $ionicLoading.hide();
    var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '로그인 먼저 해주세요.'
          });
    $location.path('/login');
  };
})
//나의 수업 출결 현황
.controller('attendanceCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  $ionicLoading.show();
  if($localstorage.getObject('cookie')){
    $http({
      method: 'post',
      url: 'http://c.youngbin.xyz/user/attendance',
      //url: 'https://f.youngbin.xyz/user/attendance',
      headers: {'Content-Type': 'application/json'},
      data: ({ cookie: $localstorage.getObject('cookie') })
    })
    .success(function(data, status, headers, config){
      $ionicLoading.hide();
      $localstorage.setObject('attendance', data);
      console.log(data);
      $scope.attendance = $localstorage.getObject('attendance').attendance;
      // 리턴
    })
    .error(function(data, status, headers, config){
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
  };
})

//시간표 조회
.controller('timetableCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  $ionicLoading.show();

  if($localstorage.getObject('cookie')){
    $http({
      method: 'post',
      url: 'http://c.youngbin.xyz/class/timetable',
      //url: 'https://f.youngbin.xyz/class/timetable',
      headers: {'Content-Type': 'application/json'},
      data: ({ cookie: $localstorage.getObject('cookie') })
    })
    .success(function(data, status, headers, config){
      $ionicLoading.hide();
      $localstorage.setObject('timetable', data);
      $scope.timetables_mon = $localstorage.getObject('timetable').monday;
      $scope.timetables_tues = $localstorage.getObject('timetable').tuesday;
      $scope.timetables_wedns = $localstorage.getObject('timetable').wednsday;
      $scope.timetables_thurs = $localstorage.getObject('timetable').thursday;
      $scope.timetables_fri = $localstorage.getObject('timetable').friday;
    })
    .error(function(data, status, headers, config){
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
  };
})

// 강의 계획서 조회
.controller('syllabusCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup){
  var date = new Date();
  var year = date.getFullYear();
    if($localstorage.getObject('cookie')){
      //정보를 입력하지 않았을 때
      $scope.syllabus = function(data) {
        $ionicLoading.show();
        if(typeof(data)=='undefined'){
         $ionicLoading.hide();
         var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '구분을 선택해 주세요.'
          });
         return false;
        }
        //만약 연도를 설정하지 않을 시 2016년으로 자동 설정
        if(typeof(data.year)=='undefined'){
          data.year = year;
        }
        //학기를 설정하지 않을 시 2학기로 자동 설정
        if(typeof(data.semester)=='undefined'){
          data.semester = "Z0102";
        }
        //교수명, 과목명, 학부명을 입력하지 않을 시 팝업창
        if(typeof(data.keyword)=='undefined'){
          if(data.type == "GYOSU") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Warning Message',
              template: '교수명을 입력해 주세요'
            });
            return false;
          }
          if(data.type == "GWAMOG") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Warning Message',
              template: '과목명을 입력해 주세요'
            });
            return false;
          }
          if(data.type == "HagbuNm") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Warning Message',
              template: '학부(과)명을 입력해 주세요'
            });
            return false;
          }
        }

      $http({
        method: 'post',
        url: 'http://c.youngbin.xyz/class/syllabus',
        //url: 'https://f.youngbin.xyz/class/syllabus',
        headers: {'Content-Type': 'application/json'},
        //값에 연도,학기,타입,교수,키워드의 값을 보낸다.
        data: ({
          year: data.year,
          semester: data.semester,
          type: data.type,
          keyword: data.keyword,
          cookie: $localstorage.getObject('cookie') })
      })
      .success(function(data, status, headers, config) {
        $ionicLoading.hide();
        $localstorage.setObject('syllabus', data);

        $scope.syllabus2 = function(data) {
          $localstorage.set('order', data);
          $location.path('/app/syllabus2');
          $localstorage.get('order');
        }

        $scope.syllabuss = $localstorage.getObject('syllabus').syllabus;
      })
      .error(function(data){
        $ionicLoading.hide();
         var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
          });
        $location.path('/login');
      })
  }}
  else {
    $ionicLoading.hide();
     var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '로그인 먼저 해주세요.'
          });
    $location.path('/login');
  };
})


// 강의 계획서
.controller('syllabus2Ctrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup){

  if($localstorage.getObject('syllabus').syllabus[$localstorage.get('order')].url) {

      $http({
        method: 'post',
        url: 'http://c.youngbin.xyz/page/syllabus_details',
        //url: 'https://f.youngbin.xyz/page/syllabus_details',
        headers: {'Content-Type': 'application/json'},
        data: ({
          url: $localstorage.getObject('syllabus').syllabus[$localstorage.get('order')].url,
          cookie: $localstorage.getObject('cookie') })
      })
      .success(function(data, status, headers, config){
        $localstorage.setObject('syllabus2', data);
        var alertPopup = $ionicPopup.alert({
              title: '강의계획서',
              template: $localstorage.getObject('syllabus2').about.subject
            });
        $scope.about = $localstorage.getObject('syllabus2').about;
        $scope.info = $localstorage.getObject('syllabus2').info;
        $scope.details = $localstorage.getObject('syllabus2').details;
      })
      .error(function(data, status, headers, config){
         var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
          });
        $location.path('/login');
      })
    $ionicLoading.hide();
  }
   else {
    $ionicLoading.hide();
     var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '로그인 먼저 해주세요.'
          });
    $location.path('/login');
  };
})

// 학과별 개설과목 조회
.controller('departmentCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup){
  var date = new Date();
  var year = date.getFullYear();
    if($localstorage.getObject('cookie')){

    //정보를 입력하지 않았을 때
    $scope.department = function(data) {
      $ionicLoading.show();
      if(typeof(data)=='undefined'){
       $ionicLoading.hide();
       var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: '학부(과)를 선택해 주세요'
        });
       return false;
      }

      if(typeof(data.year)=='undefined'){
        data.year = year;
      }

      if(typeof(data.semester)=='undefined'){
        data.semester = "Z0102";
      }

      if(typeof(data.professor)== 'undefined' ){
        data.professor = '';
      }

      $http({
        method: 'post',
        url: 'http://c.youngbin.xyz/enroll/subjects',
        //url: 'https://f.youngbin.xyz/enroll/subjects',
        headers: {'Content-Type': 'application/json'},
        data: ({
          year: data.year,
          semester: data.semester,
          depart: data.depart,
          professor: data.professor,
          cookie: $localstorage.getObject('cookie') })
      })
      .success(function(data, status, headers, config){
        $localstorage.setObject('department', data);
        $ionicLoading.hide();
        $scope.departments = $localstorage.getObject('department').subjects;
      })
      .error(function(data, status, headers, config){
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '잠시후 다시 시도해 주세요.'
          });
        $location.path('/login');
      })
    }}
    else {
    $ionicLoading.hide();
     var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: '로그인 먼저 해주세요.'
          });
    $location.path('/login');
  };
})

//학점 세이브 조회
.controller('saveCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  $ionicLoading.show();
  if($localstorage.getObject('cookie')){
    $http({
      method: 'post',
      url: 'http://c.youngbin.xyz/enroll/saved_credits',
      //url: 'https://f.youngbin.xyz/enroll/saved_credits',
      headers: {'Content-Type': 'application/json'},
      data: ({ cookie: $localstorage.getObject('cookie') })
    })
    .success(function(data, status, headers, config){
      $ionicLoading.hide();
      $localstorage.setObject('save', data);
      $scope.save = $localstorage.getObject('save').status;
      $scope.details = $localstorage.getObject('save').details;
      // 리턴
    })
    .error(function(data, status, headers, config){
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
  };
})

//장학 신청 결과
.controller('scholarshipResultCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  $ionicLoading.show();
  if($localstorage.getObject('cookie')){
    $http({
      method: 'post',
      url: 'http://c.youngbin.xyz/scholarship/result',
      //url: 'https://f.youngbin.xyz/scholarship/result',
      headers: {'Content-Type': 'application/json'},
      data: ({ cookie: $localstorage.getObject('cookie') })
    })
    .success(function(data, status, headers, config){
      $ionicLoading.hide();
      $localstorage.setObject('scholarshipResult', data);
      $scope.scholarshipResult = $localstorage.getObject('scholarshipResult').apply_history;
      // 리턴
    })
    .error(function(data, status, headers, config){
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
  };
})

//장학 내역 조회
.controller('scholarshipListCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  $ionicLoading.show();
  if($localstorage.getObject('cookie')){
    $http({
      method: 'post',
      url: 'http://c.youngbin.xyz/scholarship/history',
      //url: 'https://f.youngbin.xyz/scholarship/history',
      headers: {'Content-Type': 'application/json'},
      data: ({ cookie: $localstorage.getObject('cookie') })
    })
    .success(function(data, status, headers, config){
      $ionicLoading.hide();
      $localstorage.setObject('scholarshipList', data);
      $scope.scholarshipList = $localstorage.getObject('scholarshipList').scholarship_history;
      // 리턴
    })
    .error(function(data, status, headers, config){
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
  };
})

//교내 제출용 성적증명서
.controller('printCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  $ionicLoading.show();
  if($localstorage.getObject('cookie')){
    $http({
      method: 'post',
      url: 'http://c.youngbin.xyz/grade/certificate',
      //url: 'https://f.youngbin.xyz/grade/certificate',
      headers: {'Content-Type': 'application/json'},
      data: ({ cookie: $localstorage.getObject('cookie') })
    })
    .success(function(data, status, headers, config){
      $ionicLoading.hide();
      $localstorage.setObject('print', data);
      $scope.print = $localstorage.getObject('print').details;
      $scope.sum = $localstorage.getObject('print').details[data.details.length-1];
      // 리턴
    })
    .error(function(data, status, headers, config){
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
  };
})
//공지사항
.controller('noticesCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
  if($localstorage.getObject('cookie')){
    $http({
      method: 'get',
      url: 'https://skhu-sss.github.io/foressst/feed.json',
      headers: {'Content-Type': 'application/json'},
      data: ({ cookie: $localstorage.getObject('cookie') })
    })
    .success(function(data, status, headers, config){
      $localstorage.setObject('notices', data);
      console.log(notices);
      // 리턴
    })
    .error(function(data, status, headers, config){
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
  };
})

// 학사 일정 조회
.controller('calendarCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
    var date = new Date();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    $ionicLoading.show();
    if($localstorage.getObject('cookie')){
      $http({
        method: 'post',
        url: 'http://c.youngbin.xyz/life/schedules',
        //url: 'https://f.youngbin.xyz/page/calendar',
        headers: {'Content-Type': 'application/json'},
        data: ({
          year: year,
          month: month,
          cookie: $localstorage.getObject('cookie') })
      })
      .success(function(data, status, headers, config){
        $ionicLoading.hide();
        console.log(data);
        $localstorage.setObject('calendar', data);
        $scope.calendar = $localstorage.getObject('calendar').calendar;
      })
      .error(function(data, status, headers, config){
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
    };
  })

//학식 조회 - 식단표 조회
/*.controller('foodCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
    $ionicLoading.show();
    if($localstorage.getObject('cookie')){
      $http({
        method: 'get',
        url: 'http://localhost:3000/life/meal/urls'
        //url: 'http://c.youngbin.xyz/page/calendar',
        //url: 'https://f.youngbin.xyz/page/calendar',
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(data, status, headers, config){
        $ionicLoading.hide();
        $localstorage.setObject('food', data);
        //$scope.calendar = $localstorage.getObject('food').calendar;
        console.log(data);
        // 리턴
      })
      .error(function(data, status, headers, config){
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
    };
  })
*/
