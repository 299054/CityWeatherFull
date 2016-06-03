
var baseUrl = "http://api.openweathermap.org/data/2.5/";
var cityName = "";
var appid = "e516d7683e6a95c8bac942507e8f0e62";

var applictionTitle = "CityWeather";
var mainurl="";
var tempUnit = "";

var map;
var geoJSON;
var request;
var gettingData = false;
var locationValue="";
var openWeatherMapKey = "e516d7683e6a95c8bac942507e8f0e62"
var count = 0;
var RED = ""
var GREEN = "";
var BLUE = ""
var NetworkMessage = "Network Unavailable, please try again later";
var locationArray = new Array();

var timesToPush = new Array();

var maxTempValues = new Array();

var minTempValues = new Array();

//cityweather.controller("mainController",function($scope,$http){
//                       
//                      // alert("m here in main controler");
//                       
//                       
//                       })

cityweather.controller("locationController",function($scope,$http,$cordovaGeolocation,$cordovaNetwork,$cordovaDialogs,$ionicLoading){
                       
                        $scope.myStyle = {background: 'rgb(' + RED + ',' + GREEN + ',' + BLUE + ')'}
                      // $scope.myBackgroundUrl = "img/atmosphere.png";
                       console.log("m here in main controler");
                       var posOptions = {timeout: 10000, enableHighAccuracy: true};
                       $cordovaGeolocation
                       .getCurrentPosition(posOptions)
                       .then(function (position) {
                             
                             var lat  = position.coords.latitude;
                             var lon = position.coords.longitude;
                             
                             var lonlat = new OpenLayers.LonLat(lon, lat);
                             
                             map = new OpenLayers.Map($scope.basicMap);
                             
                             
                             var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
                             var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
                             
                             var position       = new OpenLayers.LonLat(lon,lat).transform( fromProjection, toProjection);
                             
                             // Create overlays
                             // map layer OSM
                             var mapnik = new OpenLayers.Layer.OSM();
                             // Create station layer
                             var stations = new OpenLayers.Layer.Vector.OWMStations("Stations");
                             // Create weather layer
                             var city = new OpenLayers.Layer.Vector.OWMWeather("Weather");
                             
                             //connect layers to map
                             map.addLayers([mapnik, stations, city]);
                             
                             // Add Layer switcher
                             map.addControl(new OpenLayers.Control.LayerSwitcher());
                             
                             map.setCenter( lonlat, 10 );
                             
                             console.log("here i am ");
                             
                             
                             
                             
                             }, function(err) {
                             $cordovaDialogs.alert(JSON.stringify(err), applictionTitle, 'OK').then(function(){
                                                                                                    
                                                                                                    
                                                                                                    console.log("Error is:"+JSON.stringify(err));
                                                                                                    $ionicLoading.hide({
                                                                                                    });
                                                                                                    
                                                                                                    })
                             });
                       //
                       
                       
                       })



cityweather.controller("settingsController",function($scope,$http,$cordovaPreferences,$cordovaAppRate,$cordovaSocialSharing){
                       
                       // alert("m here in main controler");
                       //$scope.tempValue="metric";
                       
                       //$scope.myBackgroundUrl = "img/atmosphere.png";
                        $scope.myStyle = {background: 'rgb(' + RED + ',' + GREEN + ',' + BLUE + ')'}
                       
                      // var tempArray = ["ºF","ºç"];
                       
                       $cordovaPreferences.fetch('tempValue')
                       .success(function(value) {
                                
                                
                               // $scope.tempValues = tempArray;
                                
                                if(value==null || value==""){
                                
                                $scope.tempValue="metric";
                                
                                }else{
                                
                                $scope.tempValue=value;
                                
                                }
                                
                                },function(){
                                
                                
                                
                                
                                });
                       
                       
                       $cordovaPreferences.fetch('locationArray')
                       .success(function(value) {
                                
                                var locationArray = [];
                                
                                locationArray = value;
                                
                                console.log("location array values are:"+locationArray);
                                $scope.locationnames = value;
                                
                                
                                $cordovaPreferences.fetch('locationValue')
                                .success(function(value) {
                                         
                                         
                                         if(value == null || value==""){
                                         
                                         $scope.locValue=locationArray[0];
                                         }else{
                                         
                                         $scope.locValue=value;
                                         }
                                         
                                         
                                         },function(err){
                                         
                                         
                                         })
                                
                                },function(){
                                
                                
                                
                                
                                });
                       
                       
                       
                       $scope.selectedtempChanged = function(tempValue){
                       
                       var selectedItem = tempValue;
                       
                       console.log("selected item:"+tempValue);
                       if(selectedItem=="imperial"){
                       console.log("degree farhenite")
                       $cordovaPreferences.store('tempValue', 'imperial')
                       .success(function(value) {
                                console.log("Success: " + value);
                                })
                       .error(function(error) {
                              console.log("Error: " + error);
                              })
                       
                       }else if(selectedItem=="metric"){
                       
                       console.log("degree celcius")
                       $cordovaPreferences.store('tempValue', 'metric')
                       .success(function(value) {
                                console.log("Success: " + value);
                                })
                       .error(function(error) {
                              console.log("Error: " + error);
                              })
                       
                       }else{
                       
                       
                       }
                       //$scope.calculatedValue = 'You selected number ' + $scope.selectedItem;
                       }
                       
                       $scope.selectedlocationChanged = function(value){
                       
                       var selectedItem = value;
                       
                       console.log("selected item is:"+selectedItem);
                       
                       
                       $cordovaPreferences.store('locationValue', selectedItem)
                       .success(function(value) {
                                console.log("Success: " + value);
                                })
                       .error(function(error) {
                              console.log("Error: " + error);
                              })
                       
                       }
                       
                       
                       $scope.rateUs = function(){
                       
                       
                       console.log("me to rate");
                       
                       $cordovaAppRate.promptForRating(true).then(function (result) {
                                                                  // success
                                                                  });
                       
                       }
                       
                       $scope.shareUs = function(){
                       
                       
                       console.log("me to share");
                       
                       var message = "Share us to support us";
                       
                       var subject = "Your support is needed to make this application more usable to everyone";
                       
                       var file = "";
                       
                       var link = "http://www.google.com";
                       
                       $cordovaSocialSharing
                       .share(message, subject, file, link) // Share via native share sheet
                       .then(function(result) {
                             // Success!
                             }, function(err) {
                             // An error occured. Show a message to the user
                             });
                       
                       }
                       
                       })

cityweather.controller("addlocationController",function($scope,$state,$http,$cordovaDialogs,$cordovaPreferences){
                       
                       // alert("m here in main controler");
                        $scope.myStyle = {background: 'rgb(' + RED + ',' + GREEN + ',' + BLUE + ')'}
                       // $scope.myBackgroundUrl = "img/atmosphere.png";
                       $scope.add = function(){
                       
                       //var location = $scope.locationvalue;
                       
                       //console.log("location"+location);
                       
                       var location1 = this.locationvalue;
                       
                       console.log("location1"+location1);
                       
                       if(location1 == "" || location1 ==null){
                       
                       $cordovaDialogs.alert("Please enter location", applictionTitle, 'OK').then(function(){
                                                                                              
                                                                                              
                                                                                             
                                                                                              
                                                                                              })
                      


                       }else{
                       
                      
                      
                                
                                $cordovaDialogs.alert("Get ready to view weather of "+location1+" !!", applictionTitle, 'OK').then(function(){
                                                                                                           
                                        
                                                                                                                                          
                                                                                  var selectedItem = location1;
                                                                                                                                      
                                                                                    console.log("selected item is:"+selectedItem);
                                                                                                                                      //var str = 'a b c';
                                                                                                                                     
                                                                                                                                      
                                                                        $cordovaPreferences.store('locationValue', selectedItem)
                                                                                .success(function(value) {
                                                                                                                                               console.log("Success: " + value);
                                                                                                                                               })
                                                                                .error(function(error) {
                                                                                                               console.log("Error: " + error);
                                                                                                                                             })

                                                                                    $state.go('tab.home',{}, {reload: true});
                                                                                                           
                                                                                                           })

                                
                       
                       }


                       }
                       
                       $scope.cancel =function(){
                       
                        $state.go('tab.settings',{}, {reload: true});
                       
                       }

                       })





cityweather.controller("homeController",function($scope,$http,$cordovaGeolocation,$ionicLoading,$cordovaNetwork,$cordovaDialogs,$cordovaPreferences){
                    
                       
                       console.log("m here in homeController controler");
                       //$scope.shouldShow = false;
                       
                       // $scope.myBackgroundUrl = "img/atmosphere.png";
                       $scope.mycolor = "#FF0000";
                       var type = $cordovaNetwork.getNetwork()
                       
                       if(type == Connection.NONE){
                       
                       
                       $cordovaDialogs.alert(NetworkMessage, applictionTitle, 'OK').then(function(){
                                                                                         $ionicLoading.hide({
                                                                                         });
                                                                                         
                                                                                         })
                       
                       }else{
                       
               
                       
                       
                       $cordovaPreferences.fetch('locationValue')
                       .success(function(value) {
                                
                       locationValue = value;
                       var posOptions = {timeout: 10000, enableHighAccuracy: true};
                       
                       
                       $cordovaGeolocation
                       .getCurrentPosition(posOptions)
                       .then(function (position) {
                             var lat  = position.coords.latitude
                             var lon = position.coords.longitude
                             
                             
                             $cordovaPreferences.fetch('tempValue')
                             .success(function(value) {
                                      
                                      if(value=="" || value == null){
                                      
                                      tempUnit = "metric";
                                      
                                      }else{
                                      
                                      
                                      tempUnit=value;
                                      
                                      
                                      }
                                      
                                      
                                      if(locationValue == null || locationValue == ""){
                                      
                                       mainurl = baseUrl+"forecast?"+"lat="+lat+"&lon="+lon+"&units="+tempUnit+"&APPID="+openWeatherMapKey;
                                      }else{
                                      
                                      console.log("location value is:"+locationValue);
                                      var replaced = locationValue.replace(/ /g,'-');
                                      console.log("selected item:"+replaced);

                                     mainurl = baseUrl+"forecast?"+"q="+replaced+"&units="+tempUnit+"&APPID="+openWeatherMapKey;
                                      }
                                      
                                      console.log("main url is:"+mainurl);
                                      
                                      $http.get(mainurl).then(function(response){
                                                              
                                                            //console.log("Success Response is:"+JSON.stringify(response));
                                                              
                                                              
                                                              if(typeof response !='object'){
                                                              
                                                              $cordovaDialogs.alert(NetworkMessage, applictionTitle, 'OK')
                                                              .then(function() {
                                                                    // callback successNetworkMessage
                                                                    
                                                                    
                                                                    $ionicLoading.hide({
                                                                    });
                                                                    
                                                                    });
                                                              
                                                              
                                                              }
                                                              
                                                              else{
                                                              
                                                              var name = response.data.city.name;
                                                              
                                                              if(name != null || name != ""){
                                                              
                                                              $cordovaPreferences.fetch('locationArray')
                                                              .success(function(value) {
                                                                       
                                                                       
                                                                       
                                                                       //var locationArray = [];
                                                                       var locationvalues = [];
                                                                       locationvalues = value;
                                                                       
                                                                       console.log("location array value is:"+locationvalues);
                                                                       
                                                                        //console.log("location array value is:"+locationvalues[0]);
                                                                       
                                                                       if(locationvalues!= null ){
                                                                       
                                                                       console.log("m here");
                                                                       
                                                                       
                                                                       if(locationvalues.indexOf(locationValue) > -1){
                                                              
                                                                         console.log("location exists");
                                                                       
                                                                       
                                                                       }else{
                                                                       
                                                                       
                                                                       console.log("location value is:"+locationValue);
                                                                       
                                                                       if(locationValue == null || locationValue == ""){
                                                                       
                                                                       locationValue = name;
                                                                       }else{
                                                                       
                                                                       
                                                                       }
                                                                       locationvalues.push(locationValue);
                                                                       
                                                                       console.log("location array is:"+locationvalues);
                                                                       $cordovaPreferences.store('locationArray',locationvalues)
                                                                       .success(function(value) {
                                                                                console.log("Success: " + value);
                                                                                })
                                                                       .error(function(error) {
                                                                              console.log("Error: " + error);
                                                                              })
                                                                       
                                                                       
                                                                       $cordovaPreferences.store('locationValue', locationValue)
                                                                       .success(function(value) {
                                                                                console.log("Success: " + value);
                                                                                })
                                                                       .error(function(error) {
                                                                              console.log("Error: " + error);
                                                                              })
                                                                       


                                                                     
                                                                       }
                                                                       
                                                                   
                                                                       
                                                                       }else{
                                                                       
                                                                       console.log("otherwise m here"+name);
                                                                       
                                                                       locationArray.push(name);
                                                                       
                                                                       console.log("location array is:"+locationArray);
                                                                       
                                                                       $cordovaPreferences.store('locationArray',locationArray)
                                                                       .success(function(value) {
                                                                                console.log("Success: " + value);
                                                                                })
                                                                       .error(function(error) {
                                                                              console.log("Error: " + error);
                                                                              })
                                                                       
                                                                       $cordovaPreferences.store('locationValue', name)
                                                                       .success(function(value) {
                                                                                console.log("Success: " + value);
                                                                                })
                                                                       .error(function(error) {
                                                                              console.log("Error: " + error);
                                                                              })


                                                                       
                                                                       
                                                                       }
                                                                       
                                                                       },function(error){
                                                                       
                                                                       
                                                                       
                                                                       });
                                                              
                                                              
                                                                }
                                                              
                                                              
                                                              
                                                              
                                                              if(locationValue == null || locationValue==""){
                                                              
                                                              $scope.title = name;
                                                              }else if(locationValue != name){
                                                              $scope.title = name+"("+locationValue+")";;
                                                              
                                                              }else{
                                                               $scope.title = name
                                                              }
                                                              
                                                              
                                                              var listOfData = [];
                                                              
                                                              listOfData =response.data.list;
                                                              
                                                              // console.log("My list is following:"+JSON.stringify(listOfData));
                                                              
                                                              var todaysData = listOfData[0];
                                                              
                                                              var currentTemp = todaysData.main.temp;
                                                              
                                                              //var kelvinTemp = "";
                                                              console.log("current Temp is:"+currentTemp);
                                                              var hue;
                                                              if(tempUnit == "metric"){
                                                                  hue = 30 + 240 * (30 - currentTemp) / 60;
                                                              }
                                                              
                                                              else{
                                                              
                                                              var tempincelciusvalue = (currentTemp - 32) / 1.8;
                                                              
                                                              console.log("temp in celcius is:"+tempincelciusvalue);
                                                                hue = 30 + 240 * (30 - tempincelciusvalue) / 60;
                                                              
                                                              }
                                                             console.log("current hue is:"+hue);
                                                             
                                                              
                                                              var R1 = Math.sin( hue ) * (.75)
                                                              var G1 = Math.sin( hue + 120 ) * (.75)
                                                              var B1 = Math.sin( hue + 240 ) * (.75)
                                                              //The tricky part is saturation, which is to a scale down to the average of those three.
                                                              
                                                              var AVERAGE = (R1 + G1 + B1) / 3
                                                              
                                                              var R2 = ((R1 - AVERAGE) * (.75)) + AVERAGE
                                                              var G2 = ((G1 - AVERAGE) * (.75)) + AVERAGE
                                                              var B2 = ((B1 - AVERAGE) * (.75)) + AVERAGE
                                                              
                                                               RED = parseInt(R2 * 255);
                                                               GREEN = parseInt(G2 * 255);
                                                               BLUE = parseInt(B2 * 255);
                                                              
                                                              console.log(RED);
                                                              console.log(GREEN);
                                                              console.log(BLUE);
                                                              
                                                              var valuetoassign = [];
                                                              
                                                             
                                                              $scope.myStyle = {background: 'rgb(' + RED + ',' + GREEN + ',' + BLUE + ')'}
                                                               //$scope.myStyle = {background: "#00003E"}
                                                              
                                                              var pressure = todaysData.main.pressure;
                                                              
                                                              $scope.atp = pressure+" "+"hPa";
                                                              
                                                              var humidity = todaysData.main.humidity;
                                                              
                                                              $scope.hl = humidity+" "+"%";
                                                              
                                                              var tempinCelcius = parseInt(currentTemp);
                                                              
                                                              
                                                              //console.log("current temp :"+currentTemp);
                                                              
                                                              var currentWeatherText = todaysData.weather[0].description;
                                                              
                                                              
                                                              
                                                              var cloudineslevel = todaysData.clouds.all;
                                                              
                                                              $scope.cl = cloudineslevel+" "+"%";
                                                              
                                                              var windSpeed = todaysData.wind.speed;
                                                              
                                                              if(tempUnit == "metric"){
                                                              $scope.ws = windSpeed+" "+"m/s";
                                                              }
                                                              else{
                                                              
                                                              $scope.ws = windSpeed+" "+"mi/hr";
                                                              }
                                                              
                                                              var windDegree = todaysData.wind.deg;
                                                              
                                                              $scope.dw = windDegree+" "+"º";
                                                              
                                                              var rainChances = todaysData.weather[0].rain;
                                                              var rainin3hr="";
                                                              if(rainChances=="Rain"){
                                                              
                                                              rainin3hr  = todaysData.rain["3h"];
                                                              
                                                              if(rainin3hr==null || rainin3hr=="")
                                                              rainin3hr = 0;
                                                              
                                                              }else{
                                                              
                                                              rainin3hr = 0;
                                                              
                                                              }
                                                              
                                                              $scope.rainper = rainin3hr+" "+"mm";
                                                              
                                                              
                                                              
                                                              $scope.wText = currentWeatherText;
                                                              
                                                              if(tempUnit == "metric"){
                                                               $scope.currentTemp = tempinCelcius+"ºC";
                                                              }
                                                             
                                                              else{
                                                              
                                                              $scope.currentTemp = tempinCelcius+"ºF";
                                                              }
                                                              
                                                              if(tempinCelcius<20){
                                                              
                                                              console.log("less than 20");
                                                              
                                                              
                                                              }
                                                              
                                                              
                                                              var iconcode = todaysData.weather[0].icon;
                                                              
                                                              var getIconUrl = "http://openweathermap.org/img/w/"+iconcode+".png";
                                                              
                                                              
                                                              $scope.imgURl = getIconUrl;
                                                              
                                                              
                                                              
                                                              var todayArray  = new Array();
                                                              
                                                              maxTempValues = [];
                                                              
                                                              minTempValues=[];
                                                              
                                                              timesToPush = [];
                                                              
                                                              
                                                              
                                                              
                                                              
                                                              for(var i in listOfData){
                                                              
                                                              //count++
                                                              var timestampvalue = listOfData[i].dt;
                                                              
                                                              
                                                              
                                                              var forecastedtime = new Date(timestampvalue*1000).getDay();
                                                              
                                                              //console.log("forecastedtime values:"+forecastedtime);
                                                              
                                                              var currentTime = new Date().getDay();
                                                              
                                                              $scope.todayDate = new Date(99,5,24);
                                                              
                                                              if(i<3){
                                                              
                                                              
                                                              var forecastedTime = new Date(timestampvalue*1000).getHours();
                                                              
                                                              
                                                              var CurrentTimeDescription = listOfData[i].weather[0].description;
                                                              
                                                              var currentTimeTemparuture = listOfData[i].main.temp;
                                                              
                                                              var currentTimeIconCode = listOfData[i].weather[0].icon;
                                                              
                                                              var iconUrl = "http://openweathermap.org/img/w/"+currentTimeIconCode+".png";
                                                              var tempinCelcius ;
                                                              
                                                              
                                                              if(tempUnit == "metric"){
                                                              tempinCelcius = parseInt(currentTimeTemparuture)+"ºC";
                                                              }else{
                                                              
                                                               tempinCelcius = parseInt(currentTimeTemparuture)+"ºF";
                                                              }
                                                              
                                                              var suffix = forecastedTime >= 12 ? "PM":"AM";
                                                              var hours = ((forecastedTime + 11) % 12 + 1) + " "+ suffix;
                                                              
                                                              
                                                              
                                                              todayArray.push({"timetoshow":hours,"Description":CurrentTimeDescription,"CurrentTemp":tempinCelcius,"iconUrl":iconUrl});
                                                              
                                                              }
                                                              
                                                              //else{
                                                              var forecastedTime1 = new Date(timestampvalue*1000);
                                                              
                                                              //forecastedTime1 = moment().format('MMMM Do YYYY, h:mm:ss a');
                                                              
                                                              var d = new Date(timestampvalue*1000);
                                                              var weekday = new Array(7);
                                                              weekday[0]=  "Sun";
                                                              weekday[1] = "Mon";
                                                              weekday[2] = "Tue";
                                                              weekday[3] = "Wed";
                                                              weekday[4] = "Thu";
                                                              weekday[5] = "Fri";
                                                              weekday[6] = "Sat";
                                                              
                                                              var n = weekday[d.getDay()];
                                                              
                                                              
                                                              var forecastedTime = new Date(timestampvalue*1000).getHours();
                                                              var suffix = forecastedTime >= 12 ? "PM":"AM";
                                                              var hours = ((forecastedTime + 11) % 12 + 1)+ suffix;
                                                              
                                                              
                                                              var finalStringToPush = n +"-"+hours;
                                                              
                                                              //console.log("final string to push:"+finalStringToPush);
                                                             
                                                              
                                                              var currentMaxtTimeTemparuture = listOfData[i].main.temp_max;
                                                              var MaxtempinCelcius = parseInt(currentMaxtTimeTemparuture) ;
                                                              
                                                              var currentMinTimeTemparuture = listOfData[i].main.temp_min;
                                                              var MintempinCelcius = parseInt(currentMinTimeTemparuture) ;
                                                              
                                                              
                                                              timesToPush.push(finalStringToPush);
                                                              
                                                              maxTempValues.push(MaxtempinCelcius);
                                                              minTempValues.push(MintempinCelcius);
                                                              
                                                              
                                                              
                                                              }
                                                              
                                                              

                                                             $scope.TodaysData = todayArray;
                                                              
                                                              //console.log("m her1");
                                                              $scope.labels = timesToPush
                                                              //console.log("m her2");
                                                              //$scope.series = ['Max-Temp in ºC', 'Min-Temp in ºC'];
                                                              
                                                              
                                                             
                                                              //console.log("m her3");
                                                              $scope.data = [
                                                                             maxTempValues,
                                                                             minTempValues
                                                                             ];
                                                              
                                                              
                                                              if(tempUnit == "metric"){
                                                              
                                                              console.log("metric series")
                                                              $scope.series = ['Max-Temp in ºC', 'Min-Temp in ºC'];
                                                               $scope.unitvalue = "ºC";
                                                              }else{
                                                              
                                                              console.log("farhenite series")
                                                              $scope.series = ['Max-Temp in ºF', 'Min-Temp in ºF'];
                                                              $scope.unitvalue = "ºF";
                                                              }
                                                              
                                                              
                                                              //console.log("m her4");
                                                              $scope.onClick = function (points, evt) {
                                                              console.log(points, evt);
                                                              };
                                                              
                                                              
              
                                                              
                                               
                                                              
                                                              
                                                              $ionicLoading.hide();
                                                              }
                                                              
                                                              },function(response){
                                                              
                                                              $ionicLoading.hide();
                                                              console.log("Failure Response is:"+JSON.stringify(response));
                                                              
                                                              $cordovaDialogs.alert(JSON.stringify(err), applictionTitle, 'OK').then(function(){
                                                                                                                                     $ionicLoading.hide({
                                                                                                                                     });
                                                                                                                                     
                                                                                                                                     })
                                                              
                                                              
                                                              });
                                      
                                      
                                      
                                      
                                      })
                             .error(function(error) {
                                    
                                    
                                    
                                    })
                             
                             
             
                             
                             }, function(err) {
                             console.log("Error in home controller :"+JSON.stringify(err));
                             $cordovaDialogs.alert(JSON.stringify(err), applictionTitle, 'OK').then(function(){
                                                                                               $ionicLoading.hide({
                                                                                               });
                                                                                               
                                                                                               })
                             });
                                
                                
                                },function(error){
                                
                                console.log("Problem in fetching value from the array"+JSON.stringify(error));
                                
                                
                                });
                       
                       }
                       
                     
                       
                       })