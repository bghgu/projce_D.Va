angular.module('starter.controllers', ['starter.services'])

  //로그인
  .controller('loginCtrl', function($scope, $http, $location, $ionicPopup, $ionicLoading, $localstorage) {
    //자동로그인 설정
    if (($localstorage.get('id') !== undefined) && ($localstorage.get('pw') !== undefined)) {
      $ionicLoading.show();
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/user/login',
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
          var count = data.length;
          if (count == 4) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Welcome',
              template: '자동 로그인 되었습니다.'
            });
            $localstorage.setObject('cookie', data);
            $location.path('/app/myPage');
          }
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
      //소프과 학인
      /*if(user.username == "201232016"){
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
      }*/
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/user/login',
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
          var count = data.length;
          if (count == 4) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Welcome',
              template: '환영합니다.'
            });
            $localstorage.setObject('cookie', data);
            $localstorage.set('id', user.username);
            $localstorage.set('pw', user.password);
            //window.localStorage['id'] = user.username
            //window.localStorage['pw'] = user.password
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
          var alertPopup = $ionicPopup.alert({
            title: 'Warning Message',
            template: '잠시후 다시 시도해 주세요.'
          });
        });
    };
  })

  //로그아웃
  .controller('logoutCtrl', function($scope, $location, $localstorage, $ionicLoading, $ionicPopup) {
    $scope.logout = function(data) {
      //저장소 초기화
      $localstorage.clear();
      $location.path('/login');

      var alertPopup = $ionicPopup.alert({
        title: 'bye bye',
        template: '로그아웃 되었습니다.'
      });
    };
  })

  //마이 페이지
  .controller('creditsCtrl', function($scope, $http, $location, $localstorage, $ionicLoading, $ionicPopup) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/user/credits',
          url: 'https://c.youngbin.xyz/foressst/user/credits',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data) {
          $ionicLoading.hide();
          $localstorage.setObject('credits', data);
          $scope.sum = 0;
          for (var i = 0; i < data.credits.length; i++) {
            $scope.sum += Number(($localstorage.getObject('credits').credits[i].earned)) / 2;
          }
          $scope.rating = $localstorage.getObject('credits').credits;
          $scope.rest = (130 - $scope.sum);
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
  })
  //나의 수업 출결 현황
  .controller('attendanceCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/user/attendance',
          url: 'https://c.youngbin.xyz/foressst/user/attendance',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('attendance', data);
          $scope.attendance = $localstorage.getObject('attendance').attendance;
          var count = $localstorage.getObject('attendance').attendance;
          if (count === 0) {
            var alertPopup = $ionicPopup.alert({
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
  })

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
  })

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
  })
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
  })

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
  })

  //신 강의 계획서 조회
  .controller('syllabus4Ctrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    //console.log($localstorage.getObject('syllabus_3').DAT[$localstorage.get('order')]);
    if ($localstorage.getObject('syllabus_3').DAT[$localstorage.get('order')]) {
      $ionicLoading.show();
      //////////////////////
      $http({
          method: 'post',
          //url: 'http://sam.skhu.ac.kr/SSE/SSEA1/SSEA102_Get강의계획서',
          //url: 'http://sam.skhu.ac.kr/SSE/SSEA1/SSEA102_Get%EA%B0%95%EC%9D%98%EA%B3%84%ED%9A%8D%EC%84%9C',
          url : 'http://sam.skhu.ac.kr/SSE/SSEA1/SSEA102_Get%EA%B0%95%EC%9D%98%EA%B3%84%ED%9A%8D%EC%84%9C',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Accept-Language': 'ko',
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json; charset=utf-8',
              'RequestVerificationToken': 'IShIqEhpBtsiW5g8I6n3qQ-2BSeo171xv-p5CYNWuFEMD_KpW2TZR014GmZhvim34SgMMQ4cSG4RHqSKTGMuMlcfLTx6Jbbgg9TEfN7UiFc1:z1T52Z4_toK5XzGHczlmirws8bxruktnVQbcnEFG9ycbk_FOna_9OSe0mYpjkhxp3E2QSmFRFJiJS_g8DzbgGxVIQ06ji0nmZ1x9utWn0Y81',
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
  })


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
  })
  //학점 세이브 조회
  .controller('saveCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/enroll/saved_credits',
          url: 'https://c.youngbin.xyz/foressst/enroll/saved_credits',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('save', data);
          var count = $localstorage.getObject('save').details.length;
          if (count === 0) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: '자료가 없습니다.'
            });
          } else {
            $scope.save = $localstorage.getObject('save').status;
            $scope.details = $localstorage.getObject('save').details;
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
  })
  //장학 신청 결과
  .controller('scholarshipResultCtrl', function($scope, $http, $location, $ionicLoading, $localstorage) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/scholarship/result',
          url: 'https://c.youngbin.xyz/foressst/scholarship/result',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('scholarshipResult', data);
          $scope.scholarshipResult = $localstorage.getObject('scholarshipResult').apply_history;
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
  })
  
  //장학 내역 조회
  .controller('scholarshipListCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/scholarship/history',
          url: 'https://c.youngbin.xyz/foressst/scholarship/history',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          console.log(data);
          $localstorage.setObject('scholarshipList', data);
          $scope.scholarshipList = $localstorage.getObject('scholarshipList').scholarship_history;
          var count = $localstorage.getObject('scholarshipList').scholarship_history.length;
          if (count === 0) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: '장학내역이 없습니다 ㅠㅠ'
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
  })

  //교내 제출용 성적증명서
  .controller('printCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/grade/certificate',
          url: 'https://c.youngbin.xyz/foressst/grade/certificate',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('print', data);
          $scope.print = $localstorage.getObject('print').details;
          $scope.sum = $localstorage.getObject('print').details[data.details.length - 1];
          var count = $localstorage.getObject('print').details.length;
          if (count === 0) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: '성적 내역이 없습니다.'
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
  })

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
  })

  // 학사 일정 조회
  .controller('calendarCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/life/schedules',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year,
            month: month % 12,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar1', data);
          $scope.calendar1 = $localstorage.getObject('calendar1').calendar;
          $scope.month1 = month % 12;
        });
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/life/schedules',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year,
            month: (month + 1) % 12,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar2', data);
          $scope.calendar2 = $localstorage.getObject('calendar2').calendar;
          $scope.month2 = (month + 1) % 12;
        });
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/life/schedules',
          url: 'https://c.youngbin.xyz/foressst/life/schedules',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            year: year,
            month: (month + 2) % 12,
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('calendar3', data);
          $scope.calendar3 = $localstorage.getObject('calendar3').calendar;
          $scope.month3 = (month + 2) % 12;
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
  })

  //상담 이력 조회
  .controller('consultingCtrl', function($scope, $http, $location, $ionicLoading, $localstorage, $ionicPopup) {
    $ionicLoading.show();
    if ($localstorage.getObject('cookie')) {
      $http({
          method: 'post',
          //url: 'http://c.youngbin.xyz/life/consulting',
          url: 'https://c.youngbin.xyz/foressst/life/consulting',
          headers: {
            'Content-Type': 'application/json'
          },
          data: ({
            cookie: $localstorage.getObject('cookie')
          })
        })
        .success(function(data, status, headers, config) {
          $ionicLoading.hide();
          $localstorage.setObject('consulting', data);
          $scope.adviser = $localstorage.getObject('consulting').adviser;
          $scope.history = $localstorage.getObject('consulting').history;
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
