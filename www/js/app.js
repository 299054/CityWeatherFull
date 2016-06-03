// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var cityweather = angular.module('starter', ['ionic','ngCordova',"chart.js"])

cityweather.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
                       //alert("m here");
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
                       
                      
                        
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
                       
                       ionic.Platform.fullScreen();
  });
                
                
})

ionic.Platform.ready(function() {
                     console.log("device ready!");
                     
                     // do your db init magic
                     
                     angular.bootstrap(document.body, ['starter']);
                     });

cityweather.config(function($stateProvider,$urlRouterProvider){
                   
                  // alert("inside state provider");
                   
                   $stateProvider
//                   .state('home',{
//                                        url: '/',
//                                        templateUrl: 'templates/home.html',
//                                        controller: 'homeController',
//                                        cache:false
//                                    })
                   
                   .state('tab',{
                          url: '/tab',
                          templateUrl: 'templates/tab.html',
                          
                          cache:false
                          })
                   
                   .state('tab.home', {
                          url: '/home',
                          views: {
                          'tab-home': {
                          templateUrl: 'templates/home.html'
                        
                          }
                          },
                          cache:false
                          })
                   
                   .state('tab.settings', {
                          url: '/settings',
                          views: {
                          'tab-settings': {
                          templateUrl: 'templates/settings.html',
                          controller: 'settingsController'
                          }
                          },
                          cache:false
                          })
                   
                   .state('tab.addlocation', {
                          url: '/addlocation',
                         
                          views: {
                          'tab-settings': {
                          templateUrl: 'templates/addlocation.html',
                          controller: 'addlocationController',
                          }
                          },
                        
                          cache:false
                          })
                   
                   
                   .state('tab.location', {
                          url: '/location',
                          views: {
                          'tab-location': {
                          templateUrl: 'templates/location.html',
                          controller: 'locationController'
                          }
                          },
                          cache:false
                          })

                   
                 $urlRouterProvider.otherwise('/tab/home');
    
                   })



cityweather.config(['ChartJsProvider', function (ChartJsProvider) {
         // Configure all charts
         ChartJsProvider.setOptions({
                                    colours: ['#FF5252', '#FF8A80'],
                                    responsive: true,
                                    showTooltips:true,
                                    tooltipEvents:["touchstart","touchmove"],
                                    
                                    });
         // Configure all line charts
         ChartJsProvider.setOptions('Line', {
                                    datasetFill: true
                                    });
         }])


cityweather.config(function ($cordovaAppRateProvider) {
              
              document.addEventListener("deviceready", function () {
                                        
                                        var prefs = {
                                        language: 'en',
                                        appName: 'CityWeather',
                                        iosURL: '<my_app_id>',
                                        androidURL: 'market://details?id=<package_name>',
                                        windowsURL: 'ms-windows-store:Review?name=<...>'
                                        };
                                        
                                        $cordovaAppRateProvider.setPreferences(prefs)
                                        
                                        }, false);
              });
cityweather.config(['$ionicConfigProvider', function($ionicConfigProvider) {
              
              $ionicConfigProvider.tabs.position('bottom'); // other values: top
              $ionicConfigProvider.views.swipeBackEnabled(false);
              
              }]);