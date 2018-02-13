// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services'])

  .run(function($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //사이드 메뉴
      //상태
      .state('app', {
        //url경로
        url: '/app',
        //추상화
        abstract: true,
        //html주소 위치
        templateUrl: 'templates/menu.html'
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //로그인 페이지
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        //컨트롤러 이름
        controller: 'loginCtrl'
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //마이 페이지
      .state('app.myPage', {
        url: '/myPage',
        //view포함 설정
        views: {
          'menuContent': {
            templateUrl: 'templates/myPage/myPage.html',
            //Controller: 'noticesCtrl'
          }
        }
      })
      //현재 이수 학점
      .state('app.credits', {
        url: '/credits',
        views: {
          'menuContent': {
            templateUrl: 'templates/myPage/credits.html',
            controller: 'creditsCtrl'
          }
        }
      })
      //나의 수업 출결 현황
      .state('app.attendance', {
        url: '/attendance',
        views: {
          'menuContent': {
            templateUrl: 'templates/myPage/attendance.html',
            controller: 'attendanceCtrl'
          }
        }
      })
      //학사 일정 조회
      .state('app.calendar', {
        url: '/calendar',
        views: {
          'menuContent': {
            templateUrl: 'templates/myPage/calendar.html',
            controller: 'calendarCtrl'
          }
        }
      })
      //나의 상담 이력 조회
      .state('app.consulting', {
        url: '/consulting',
        views: {
          'menuContent': {
            templateUrl: 'templates/myPage/consulting.html',
            controller: 'consultingCtrl'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //수업 관리
      .state('app.class', {
        url: '/class',
        views: {
          'menuContent': {
            templateUrl: 'templates/class/class.html'
          }
        }
      })
      //개인 시간표 조회
      .state('app.myTable', {
        url: '/myTable',
        views: {
          'menuContent': {
            templateUrl: 'templates/class/myTable/myTable.html',
            controller: 'timetableCtrl'
          }
        }
      })
      //강의 계획서 조회
      .state('app.syllabus', {
        url: '/syllabus',
        views: {
          'menuContent': {
            templateUrl: 'templates/class/syllabus/syllabus.html',
            controller: 'syllabusCtrl'
          }
        }
      })
      //강의 계획서1
      .state('app.syllabus2', {
        url: '/syllabus2',
        views: {
          'menuContent': {
            templateUrl: 'templates/class/syllabus/syllabus2.html',
            controller: 'syllabus2Ctrl'
          }
        }
      })
      //신 강의 계획서
      .state('app.syllabus3', {
        url: '/syllabus3',
        views: {
          'menuContent': {
            templateUrl: 'templates/class/syllabus/syllabus3.html',
            controller: 'syllabus3Ctrl'
          }
        }
      })

      //신 강의 계획서 조회
      .state('app.syllabus4', {
        url: '/syllabus4',
        views: {
          'menuContent': {
            templateUrl: 'templates/class/syllabus/syllabus4.html',
            controller: 'syllabus4Ctrl'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //수강 관리
      .state('app.classRegister', {
        url: '/classRegister',
        views: {
          'menuContent': {
            templateUrl: 'templates/classRegister/classRegister.html'
          }
        }
      })
      //학과별 개설과목 조회
      .state('app.department', {
        url: '/department',
        views: {
          'menuContent': {
            templateUrl: 'templates/classRegister/department/department.html',
            controller: 'departmentCtrl'
          }
        }
      })
      //학점 세이브 조회
      .state('app.save', {
        url: '/save',
        views: {
          'menuContent': {
            templateUrl: 'templates/classRegister/save/save.html',
            controller: 'saveCtrl'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //성적 관리
      .state('app.grade', {
        url: '/grade',
        views: {
          'menuContent': {
            templateUrl: 'templates/grade/grade.html'
          }
        }
      })
      //학내 제출용 성적 증명서
      .state('app.print', {
        url: '/print',
        views: {
          'menuContent': {
            templateUrl: 'templates/grade/print/print.html',
            controller: 'printCtrl'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //졸업 관리
      .state('app.graduation', {
        url: '/graduation',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/graduation.html'
          }
        }
      })
      //졸업이수 학점표
      .state('app.gradesTable', {
        url: '/gradesTable',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/gradesTable/gradesTable.html'
          }
        }
      })
      //학과별 졸업요건
      .state('app.requirement', {
        url: '/requirement',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/requirement.html'
          }
        }
      })
      //신학과 졸업요건
      .state('app.god', {
        url: '/god',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/god.html'
          }
        }
      })
      //영어학과 졸업요건
      .state('app.english', {
        url: '/english',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/english.html'
          }
        }
      })
      //중어중국학과 졸업요건
      .state('app.china', {
        url: '/china',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/china.html'
          }
        }
      })
      //일어일본학과 졸업요건
      .state('app.japan', {
        url: '/japan',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/japan.html'
          }
        }
      })
      //사회복지학과 졸업요건
      .state('app.welfare', {
        url: '/welfare',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/welfare.html'
          }
        }
      })
      //사회과학부 졸업요건
      .state('app.social', {
        url: '/social',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/social.html'
          }
        }
      })
      //신문방송학과 졸업요건
      .state('app.broadcast', {
        url: '/broadcast',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/broadcast.html'
          }
        }
      })
      //경영학부 졸업요건
      .state('app.operation', {
        url: '/operation',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/operation.html'
          }
        }
      })
      //디지털컨텐츠학과 졸업요건
      .state('app.contents', {
        url: '/contents',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/contents.html'
          }
        }
      })
      //컴퓨터공학과 졸업요건
      .state('app.computer', {
        url: '/computer',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/computer.html'
          }
        }
      })
      //소프트웨어공학과 졸업요건
      .state('app.software', {
        url: '/software',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/software.html'
          }
        }
      })
      //글로컬IT학과 졸업요건
      .state('app.glocal', {
        url: '/glocal',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/glocal.html'
          }
        }
      })
      //정보통신공학과 졸업요건
      .state('app.communication', {
        url: '/communication',
        views: {
          'menuContent': {
            templateUrl: 'templates/graduation/requirement/communication.html'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //장학 관리
      .state('app.encouragement', {
        url: '/encouragement',
        views: {
          'menuContent': {
            templateUrl: 'templates/encouragement/encouragement.html'
          }
        }
      })
      //장학신청결과(학부)
      .state('app.scholarshipResult', {
        url: '/scholarshipResult',
        views: {
          'menuContent': {
            templateUrl: 'templates/encouragement/scholarshipResult/scholarshipResult.html',
            controller: 'scholarshipResultCtrl'
          }
        }
      })
      //장학 내역 조회
      .state('app.scholarshipList', {
        url: '/scholarshipList',
        views: {
          'menuContent': {
            templateUrl: 'templates/encouragement/scholarshipList/scholarshipList.html',
            controller: 'scholarshipListCtrl'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //교과 관리
      .state('app.curriculum', {
        url: '/curriculum',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/curriculum.html'
          }
        }
      })
      //학과별 교과과정
      .state('app.course', {
        url: '/course',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/course.html'
          }
        }
      })
      //신학과 교과과정
      .state('app.god1', {
        url: '/god1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/god.html'
          }
        }
      })
      //영어학과 교과과정
      .state('app.english1', {
        url: '/english1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/english.html'
          }
        }
      })
      //중어중국학과 교과과정
      .state('app.china1', {
        url: '/china1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/china.html'
          }
        }
      })
      //일어일본학과 교과과정
      .state('app.japan1', {
        url: '/japan1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/japan.html'
          }
        }
      })
      //사회복지학과 교과과정
      .state('app.welfare1', {
        url: '/welfare1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/welfare.html'
          }
        }
      })
      //사회과학부 교과과정
      .state('app.social1', {
        url: '/social1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/social.html'
          }
        }
      })
      //신문방송학과 교과과정
      .state('app.broadcast1', {
        url: '/broadcast1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/broadcast.html'
          }
        }
      })
      //경영학부 교과과정
      .state('app.operation1', {
        url: '/operation1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/operation.html'
          }
        }
      })
      //디지털컨텐츠학과 교과과정
      .state('app.contents1', {
        url: '/contents1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/contents.html'
          }
        }
      })
      //컴퓨터공학과 교과과정
      .state('app.computer1', {
        url: '/computer1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/computer.html'
          }
        }
      })
      //소프트웨어공학과 교과과정
      .state('app.software1', {
        url: '/software1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/software.html'
          }
        }
      })
      //글로컬IT학과 교과과정
      .state('app.glocal1', {
        url: '/glocal1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/glocal.html'
          }
        }
      })
      //정보통신공학과 교과과정
      .state('app.communication1', {
        url: '/communication1',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/course/communication.html'
          }
        }
      })
      //기타과정 안내
      .state('app.otherCourse', {
        url: '/otherCourse',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/otherCourse.html'
          }
        }
      })
      //사회진출지원실 ‘직무현장실습’ 교과목 안내
      .state('app.socialParticipation', {
        url: '/socialParticipation',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/socialParticipation.html'
          }
        }
      })
      //평생교육사과정 안내
      .state('app.continuingEducation', {
        url: '/continuingEducation',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/continuingEducation.html'
          }
        }
      })
      //사회봉사 안내
      .state('app.socialService', {
        url: '/socialService',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/socialService.html'
          }
        }
      })
      //해외교육프로그램 안내
      .state('app.overseasEducation', {
        url: '/overseasEducation',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/overseasEducation.html'
          }
        }
      })
      //기도모임 안내
      .state('app.prayerMeeting', {
        url: '/prayerMeeting',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/prayerMeeting.html'
          }
        }
      })
      //NGO 연계전공
      .state('app.NGO', {
        url: '/NGO',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/NGO.html'
          }
        }
      })
      //문화기획 연계전공
      .state('app.culturalPlanning', {
        url: '/culturalPlanning',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/culturalPlanning.html'
          }
        }
      })
      //교직과정
      .state('app.teachingCourses', {
        url: '/teachingCourses',
        views: {
          'menuContent': {
            templateUrl: 'templates/curriculum/otherCourse/teachingCourses.html'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //안내
      .state('app.information', {
        url: '/information',
        views: {
          'menuContent': {
            templateUrl: 'templates/information/information.html'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //교내전화
      .state('app.tel', {
        url: '/tel',
        views: {
          'menuContent': {
            templateUrl: 'templates/tel/tel.html',
            //controller: 'telCtrl'
          }
        }
      })
      .state('app.tel1', {
        url: '/tel1',
        views: {
          'menuContent': {
            templateUrl: 'templates/tel/tel1.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.tel2', {
        url: '/tel2',
        views: {
          'menuContent': {
            templateUrl: 'templates/tel/tel2.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.tel3', {
        url: '/tel3',
        views: {
          'menuContent': {
            templateUrl: 'templates/tel/tel3.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.tel4', {
        url: '/tel4',
        views: {
          'menuContent': {
            templateUrl: 'templates/tel/tel4.html',
            //controller: 'tel1Ctrl'
          }
        }
      }).state('app.tel5', {
        url: '/tel5',
        views: {
          'menuContent': {
            templateUrl: 'templates/tel/tel5.html',
            //controller: 'tel1Ctrl'
          }
        }
      }).state('app.tel6', {
        url: '/tel6',
        views: {
          'menuContent': {
            templateUrl: 'templates/tel/tel6.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.tel7', {
        url: '/tel7',
        views: {
          'menuContent': {
            templateUrl: 'templates/tel/tel7.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      .state('app.test', {
        url: '/test',
        views: {
          'menuContent': {
            templateUrl: 'templates/test.html',
            //controller: 'tel1Ctrl'
          }
        }
      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //로그 아웃
      .state('app.logout', {
        url: '/logout',
        views: {
          'menuContent': {
            templateUrl: 'templates/logout.html',
            controller: 'logoutCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  });
