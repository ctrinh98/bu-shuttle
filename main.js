var liveBus;
var shape;
var tor;
var result;
var stops;
var busId;
var callName;
var numBuses;

// moment.updateLocale('en', {
//   relativeTime : {
//       future: "in %s",
//       past:   "%s ago",
//       s  : 'ARR',
//       ss : '%d seconds',
//       m:  "1m",
//       mm: "%d" + "m",
//       h:  "1hr",
//       hh: "%d hours",
//       d:  "a day",
//       dd: "%d days",
//       M:  "a month",
//       MM: "%d months",
//       y:  "a year",
//       yy: "%d years"
//   }
// });

moment.updateLocale('en', {
  relativeTime : {
      future: "in %s",
      past:   "%s ago",
      s  : 'Now arriving',
      ss : '%d seconds',
      m:  "1 minute",
      mm: "%d minutes",
      h:  "1 hour",
      hh: "%d hours",
      d:  "a day",
      dd: "%d days",
      M:  "a month",
      MM: "%d months",
      y:  "a year",
      yy: "%d years"
  }
});

// Beginning of livebus function.
function livebus() {
  liveBus = [];
  busId = [];
  callName = [];
  fetch('http://www-devl.bu.edu/nisdev/php5/bu-mobile-backend-demo/bu-mobile-backend/rpc/bus/livebus.json.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      if (myJson['totalResultsAvailable'] > 0) {
        for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
          result = [];
          result.push(myJson['ResultSet']['Result'][i]['lat']);
          result.push(myJson['ResultSet']['Result'][i]['lng']);
          liveBus.push(result);
          busId.push(myJson['ResultSet']['Result'][i]['id']);
          callName.push(myJson['ResultSet']['Result'][i]['call_name']);
          document.getElementById("bus_id").innerHTML = busId[0];
          document.getElementById("call_name").innerHTML = callName[0];
          if (myJson['totalResultsAvailable'] > 1) {
            document.getElementById("bus_id2").innerHTML = busId[1];
            document.getElementById("call_name2").innerHTML = callName[1];
          }
          if (myJson['totalResultsAvailable'] > 2) {
            document.getElementById("bus_id3").innerHTML = busId[2];
            document.getElementById("call_name3").innerHTML = callName[2];
          }
          if (myJson['totalResultsAvailable'] > 3) {
            document.getElementById("bus_id4").innerHTML = busId[3];
            document.getElementById("call_name4").innerHTML = callName[3];
          }
          if (myJson['totalResultsAvailable'] > 4) {
            document.getElementById("bus_id5").innerHTML = busId[4];
            document.getElementById("call_name5").innerHTML = callName[4];
          }
        }
      }
      if (myJson['totalResultsAvailable'] < 5) {
        if (myJson['totalResultsAvailable'] < 4) {
          if (myJson['totalResultsAvailable'] < 3) {
            if (myJson['totalResultsAvailable'] < 2) {
              if (myJson['totalResultsAvailable'] < 1) {
                if (document.getElementById("title") != null) {
                  $("#data").hide();
                }
              }
              if (document.getElementById("title2") != null) {
                // var parent = document.getElementById("data");
                // var child = document.getElementById("data2");
                // parent.removeChild(child);
                $("#data2").hide();
                // $("#data").show();
              }
            }
            if (document.getElementById("title3") != null) {
              // var parent = document.getElementById("data3");
              // var child1 = document.getElementById("title3");
              // var child2 = document.getElementById("bus_id3");
              // var child3 = document.getElementById("stop3");
              // var child4 = document.getElementById("stopName3");
              // var child5 = document.getElementById("estimates3");
              // parent.removeChild(child1);
              // parent.removeChild(child2);
              // parent.removeChild(child3);
              // parent.removeChild(child4);
              // parent.removeChild(child5);

              // var parent = document.getElementById("data");
              // var child = document.getElementById("data3");
              // parent.removeChild(child);
              $("#data3").hide();
              // $("#data2").show();
            }
          }
          if (document.getElementById("title4") != null) {
            // var parent = document.getElementById("data4");
            // var child1 = document.getElementById("title4");
            // var child2 = document.getElementById("bus_id4");
            // var child3 = document.getElementById("stop4");
            // var child4 = document.getElementById("stopName4");
            // var child5 = document.getElementById("estimates4");
            // parent.removeChild(child1);
            // parent.removeChild(child2);
            // parent.removeChild(child3);
            // parent.removeChild(child4);
            // parent.removeChild(child5);

            // var parent = document.getElementById("data");
            // var child = document.getElementById("data4");
            // parent.removeChild(child);
            $("#data4").hide();
            // $("#data3").show();
          }
        }
        if (document.getElementById("title5") != null) {
          $("#data5").hide();
          // $("#data4").show();
        }
      }
      if (myJson['service'] == null) {
        document.getElementById("service").innerHTML = 'null';
      } else {
        document.getElementById("service").innerHTML = myJson['service'];
        document.getElementById("service_id").innerHTML = myJson['service_id'];
      }
      busPosition();
      reloadBusPosition();
    }
  );
};
livebus();
setInterval(function() { livebus() }, 5000);

//
var stopName;
var stopName2;
var stopName3;
var stopName4;
var stopName5;
var numRunning;
// var numBuses;

function estimate() {
  // liveBus = [];
  fetch('http://www-devl.bu.edu/nisdev/php5/bu-mobile-backend-demo/bu-mobile-backend/rpc/bus/livebus.json.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      numRunning = 0;
      numBuses = myJson['totalResultsAvailable'];
      if (myJson['totalResultsAvailable'] > 0) {
        // console.log(myJson['ResultSet']['Result'][0]['arrival_estimates'].length);
        if (myJson['ResultSet']['Result'][0]['arrival_estimates'] == undefined) {
          // document.getElementById("estimates").innerHTML = 'Loading...'
          document.getElementById("estimates").innerHTML = "";
          document.getElementById("estimates").className = "loader";
          document.getElementById("stop").innerHTML = "NO_SERVICE"
          numRunning += 1;
        } else {
          if (myJson['ResultSet']['Result'][0]['arrival_estimates'].length > 0) {
            document.getElementById("estimates").className = "";
            document.getElementById("estimates").innerHTML = moment(myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['arrival_at'],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            document.getElementById("stop").innerHTML = myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['stop_id'];
            stopName = myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['stop_id'];
            // stopName2 = myJson['ResultSet']['Result'][1]['arrival_estimates'][0]['stop_id'];
            // console.log(myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['arrival_at']);
          }
        }
        if (myJson['totalResultsAvailable'] > 1) {
          if (myJson['ResultSet']['Result'][1]['arrival_estimates'] == undefined) {
            // document.getElementById("estimates2").innerHTML = 'Loading...'
            document.getElementById("estimates2").innerHTML = "";
            document.getElementById("estimates2").className = "loader";
            document.getElementById("stop2").innerHTML = "NO_SERVICE"
            numRunning += 1;
          } else {
            if (myJson['ResultSet']['Result'][1]['arrival_estimates'].length > 0) {
              // moment("2018-05-29T14:08:17-04:00","YYYY-MM-DDTHH:mm:ss-Z").fromNow(true)
              document.getElementById("estimates2").className = "";
              document.getElementById("estimates2").innerHTML = moment(myJson['ResultSet']['Result'][1]['arrival_estimates'][0]['arrival_at'],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              document.getElementById("stop2").innerHTML = myJson['ResultSet']['Result'][1]['arrival_estimates'][0]['stop_id'];
              // stopName = myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['stop_id'];
              stopName2 = myJson['ResultSet']['Result'][1]['arrival_estimates'][0]['stop_id'];
              // console.log(myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['arrival_at']);
            }
          }
        }
        if (myJson['totalResultsAvailable'] > 2) {
          if (myJson['ResultSet']['Result'][2]['arrival_estimates'] == undefined) {
            // document.getElementById("estimates3").innerHTML = 'Loading...'
            document.getElementById("estimates3").innerHTML = "";
            document.getElementById("estimates3").className = "loader";
            document.getElementById("stop3").innerHTML = "NO_SERVICE"
            numRunning += 1;
          } else {
            if (myJson['ResultSet']['Result'][2]['arrival_estimates'].length > 0) {
              document.getElementById("estimates3").className = "";
              document.getElementById("estimates3").innerHTML = moment(myJson['ResultSet']['Result'][2]['arrival_estimates'][0]['arrival_at'],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              document.getElementById("stop3").innerHTML = myJson['ResultSet']['Result'][2]['arrival_estimates'][0]['stop_id'];
              // stopName = myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['stop_id'];
              stopName3 = myJson['ResultSet']['Result'][2]['arrival_estimates'][0]['stop_id'];
              // console.log(myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['arrival_at']);
            }
          }
        }
        if (myJson['totalResultsAvailable'] > 3) {
          if (myJson['ResultSet']['Result'][3]['arrival_estimates'] == undefined) {
            // document.getElementById("estimates4").innerHTML = 'Loading...'
            document.getElementById("estimates4").innerHTML = "";
            document.getElementById("estimates4").className = "loader";
            document.getElementById("stop4").innerHTML = "NO_SERVICE"
            numRunning += 1;
          } else {
            if (myJson['ResultSet']['Result'][3]['arrival_estimates'].length > 0) {
              document.getElementById("estimates4").className = "";
              document.getElementById("estimates4").innerHTML = moment(myJson['ResultSet']['Result'][3]['arrival_estimates'][0]['arrival_at'],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              document.getElementById("stop4").innerHTML = myJson['ResultSet']['Result'][3]['arrival_estimates'][0]['stop_id'];
              // stopName = myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['stop_id'];
              stopName4 = myJson['ResultSet']['Result'][3]['arrival_estimates'][0]['stop_id'];
              // console.log(myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['arrival_at']);
            }
          }
        }
        if (myJson['totalResultsAvailable'] > 4) {
          if (myJson['ResultSet']['Result'][4]['arrival_estimates'] == undefined) {
            // document.getElementById("estimates4").innerHTML = 'Loading...'
            document.getElementById("estimates5").innerHTML = "";
            document.getElementById("estimates5").className = "loader";
            document.getElementById("stop5").innerHTML = "NO_SERVICE"
            numRunning += 1;
          } else {
            if (myJson['ResultSet']['Result'][4]['arrival_estimates'].length > 0) {
              document.getElementById("estimates5").className = "";
              document.getElementById("estimates5").innerHTML = moment(myJson['ResultSet']['Result'][4]['arrival_estimates'][0]['arrival_at'],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              document.getElementById("stop5").innerHTML = myJson['ResultSet']['Result'][4]['arrival_estimates'][0]['stop_id'];
              // stopName = myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['stop_id'];
              stopName5 = myJson['ResultSet']['Result'][4]['arrival_estimates'][0]['stop_id'];
              // console.log(myJson['ResultSet']['Result'][0]['arrival_estimates'][0]['arrival_at']);
            }
          }
        }
        document.getElementById("num_running").innerHTML = numBuses - numRunning;
        document.getElementById("num_buses").innerHTML = numBuses;
        if (numBuses - numRunning == 1) {
          document.getElementById("service_strength").innerHTML = "slow ";
        } else if (numBuses - numRunning > 1) {
          document.getElementById("service_strength").innerHTML = "normal ";
        } else if (numBuses - numRunning > 3) {
          document.getElementById("service_strength").innerHTML = "fast ";
        };
        if (numBuses - numRunning == 1) {
          $(".b1e").show();
          $(".b2e").hide();
          $(".b3e").hide();
          $(".b4e").hide();
        } else if (numBuses - numRunning == 2) {
          $(".b1e").show();
          $(".b2e").show();
          $(".b3e").hide();
          $(".b4e").hide();
        } else if (numBuses - numRunning == 3) {
          $(".b1e").show();
          $(".b2e").show();
          $(".b3e").show();
          $(".b4e").hide();
        } else if (numBuses - numRunning > 3) {
          $(".b1e").show();
          $(".b2e").show();
          $(".b3e").show();
          $(".b4e").show();
        };
        // for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
        //   result = [];
        //   result.push(myJson['ResultSet']['Result'][i]['lat']);
        //   result.push(myJson['ResultSet']['Result'][i]['lng']);
        //   liveBus.push(result);
        // }
      }
    }
  )
};
estimate();
setInterval(function() { estimate() }, 5000);

//
function liveStop() {
  // liveBus = [];
  fetch('http://www-devl.bu.edu/nisdev/php5/bu-mobile-backend-demo/bu-mobile-backend/rpc/bus/stops.json.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      // console.log(myJson['totalResultsAvailable'])
      if (myJson['totalResultsAvailable'] > 0) {
        // console.log('yep');
        for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
          // result = [];
          // console.log(i);
          if (myJson['ResultSet']['Result'][i]['transloc_stop_id'] == stopName) {
            document.getElementById("stopName").innerHTML = myJson['ResultSet']['Result'][i]['stop_name'];
          }
          if (myJson['totalResultsAvailable'] > 1) {
            if (myJson['ResultSet']['Result'][i]['transloc_stop_id'] == stopName2) {
              document.getElementById("stopName2").innerHTML = myJson['ResultSet']['Result'][i]['stop_name'];
              // console.log('yayy')
            }
          }
          if (myJson['totalResultsAvailable'] > 2) {
            if (myJson['ResultSet']['Result'][i]['transloc_stop_id'] == stopName3) {
              document.getElementById("stopName3").innerHTML = myJson['ResultSet']['Result'][i]['stop_name'];
              var omg = (myJson['totalResultsAvailable']);
              // console.log('yayy')
            }
          }
          if (myJson['totalResultsAvailable'] > 3) {
            if (myJson['ResultSet']['Result'][i]['transloc_stop_id'] == stopName4) {
              document.getElementById("stopName4").innerHTML = myJson['ResultSet']['Result'][i]['stop_name'];
              // console.log('yayy')
            }
          }
          if (myJson['totalResultsAvailable'] > 4) {
            if (myJson['ResultSet']['Result'][i]['transloc_stop_id'] == stopName5) {
              document.getElementById("stopName5").innerHTML = myJson['ResultSet']['Result'][i]['stop_name'];
              // console.log('yayy')
            }
          }
          // result.push(myJson['ResultSet']['Result'][i]['lat']);
          // result.push(myJson['ResultSet']['Result'][i]['lng']);
          // liveBus.push(result);
        }
        if (myJson['ResultSet']['Result'][14]['transloc_stop_id'] == null) {
          $("#odata8").hide();
        } else {
          $("#odata8").show();
        }
      }
      // busPosition();
      // reloadBusPosition();
    }
  );
};
liveStop();
setInterval(function() { liveStop() }, 5000);

var m1s;
var lastEst;
var m1e;

var m2s;
var m3s;
var m4s;
var m5s;
var m6s;
var m7s;

function proximity() {
  // liveBus = [];
  fetch('http://www-devl.bu.edu/nisdev/php5/bu-mobile-backend-demo/bu-mobile-backend/rpc/bus/livebus.json.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      // console.log('oh');
      if (myJson['totalResultsAvailable'] > 0) {
        // console.log('yes');
        if (numBuses > 0) {
          // M1 4160714
          // console.log(myJson['ResultSet']['Result'][17]);
          // console.log('yep');
          m1s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4160714') {
                  m1s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          m1s = m1s.sort();
          if (m1s.length > 0) {
            document.getElementById("m1s1").innerHTML = moment(m1s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (m1s.length > 1) {
              document.getElementById("m1s2").innerHTML = moment(m1s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (m1s.length > 2) {
                document.getElementById("m1s3").innerHTML = moment(m1s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (m1s.length > 3) {
                  document.getElementById("m1s4").innerHTML = moment(m1s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // M2 4114006
          m2s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4114006') {
                  m2s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          m2s = m2s.sort();
          if (m2s.length > 0) {
            document.getElementById("m2s1").innerHTML = moment(m2s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (m2s.length > 1) {
              document.getElementById("m2s2").innerHTML = moment(m2s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (m2s.length > 2) {
                document.getElementById("m2s3").innerHTML = moment(m2s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (m2s.length > 3) {
                  document.getElementById("m2s4").innerHTML = moment(m2s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // M3 4149154
          m3s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4149154') {
                  m3s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          m3s = m3s.sort();
          if (m3s.length > 0) {
            document.getElementById("m3s1").innerHTML = moment(m3s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (m3s.length > 1) {
              document.getElementById("m3s2").innerHTML = moment(m3s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (m3s.length > 2) {
                document.getElementById("m3s3").innerHTML = moment(m3s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (m3s.length > 3) {
                  document.getElementById("m3s4").innerHTML = moment(m3s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // M4 4068466
          m4s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4068466') {
                  m4s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          m4s = m4s.sort();
          if (m4s.length > 0) {
            document.getElementById("m4s1").innerHTML = moment(m4s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (m4s.length > 1) {
              document.getElementById("m4s2").innerHTML = moment(m4s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (m4s.length > 2) {
                document.getElementById("m4s3").innerHTML = moment(m4s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (m4s.length > 3) {
                  document.getElementById("m4s4").innerHTML = moment(m4s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // M5 4068470
          m5s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4068470') {
                  m5s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          m5s = m5s.sort();
          if (m5s.length > 0) {
            document.getElementById("m5s1").innerHTML = moment(m5s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (m5s.length > 1) {
              document.getElementById("m5s2").innerHTML = moment(m5s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (m5s.length > 2) {
                document.getElementById("m5s3").innerHTML = moment(m5s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (m5s.length > 3) {
                  document.getElementById("m5s4").innerHTML = moment(m5s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // M6 4110206
          m6s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4110206') {
                  m6s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          m6s = m6s.sort();
          if (m6s.length > 0) {
            document.getElementById("m6s1").innerHTML = moment(m6s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (m6s.length > 1) {
              document.getElementById("m6s2").innerHTML = moment(m6s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (m6s.length > 2) {
                document.getElementById("m6s3").innerHTML = moment(m6s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (m6s.length > 3) {
                  document.getElementById("m6s4").innerHTML = moment(m6s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // M7 4068482
          m7s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4068482') {
                  m7s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          m7s = m7s.sort();
          if (m7s.length > 0) {
            document.getElementById("m7s1").innerHTML = moment(m7s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (m7s.length > 1) {
              document.getElementById("m7s2").innerHTML = moment(m7s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (m7s.length > 2) {
                document.getElementById("m7s3").innerHTML = moment(m7s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (m7s.length > 3) {
                  document.getElementById("m7s4").innerHTML = moment(m7s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // C1 4068482
          c1s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4068482') {
                  c1s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          c1s = c1s.sort();
          if (c1s.length > 0) {
            document.getElementById("c1s1").innerHTML = moment(c1s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (c1s.length > 1) {
              document.getElementById("c1s2").innerHTML = moment(c1s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (c1s.length > 2) {
                document.getElementById("c1s3").innerHTML = moment(c1s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (c1s.length > 3) {
                  document.getElementById("c1s4").innerHTML = moment(c1s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // C2 4160718
          c2s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4160718') {
                  c2s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          c2s = c2s.sort();
          if (c2s.length > 0) {
            document.getElementById("c2s1").innerHTML = moment(c2s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (c2s.length > 1) {
              document.getElementById("c2s2").innerHTML = moment(c2s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (c2s.length > 2) {
                document.getElementById("c2s3").innerHTML = moment(c2s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (c2s.length > 3) {
                  document.getElementById("c2s4").innerHTML = moment(c2s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // C3 4160722
          c3s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4160722') {
                  c3s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          c3s = c3s.sort();
          if (c3s.length > 0) {
            document.getElementById("c3s1").innerHTML = moment(c3s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (c3s.length > 1) {
              document.getElementById("c3s2").innerHTML = moment(c3s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (c3s.length > 2) {
                document.getElementById("c3s3").innerHTML = moment(c3s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (c3s.length > 3) {
                  document.getElementById("c3s4").innerHTML = moment(c3s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // C4 4160726
          c4s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4160726') {
                  c4s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          c4s = c4s.sort();
          if (c4s.length > 0) {
            document.getElementById("c4s1").innerHTML = moment(c4s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (c4s.length > 1) {
              document.getElementById("c4s2").innerHTML = moment(c4s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (c4s.length > 2) {
                document.getElementById("c4s3").innerHTML = moment(c4s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (c4s.length > 3) {
                  document.getElementById("c4s4").innerHTML = moment(c4s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // C5 4160730
          c5s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4160730') {
                  c5s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          c5s = c5s.sort();
          if (c5s.length > 0) {
            document.getElementById("c5s1").innerHTML = moment(c5s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (c5s.length > 1) {
              document.getElementById("c5s2").innerHTML = moment(c5s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (c5s.length > 2) {
                document.getElementById("c5s3").innerHTML = moment(c5s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (c5s.length > 3) {
                  document.getElementById("c5s4").innerHTML = moment(c5s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // C6 4160734
          c6s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4160734') {
                  c6s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          c6s = c6s.sort();
          if (c6s.length > 0) {
            document.getElementById("c6s1").innerHTML = moment(c6s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (c6s.length > 1) {
              document.getElementById("c6s2").innerHTML = moment(c6s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (c6s.length > 2) {
                document.getElementById("c6s3").innerHTML = moment(c6s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (c6s.length > 3) {
                  document.getElementById("c6s4").innerHTML = moment(c6s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // C7 4160738
          c7s = [];
          for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
            if (myJson['ResultSet']['Result'][i]['arrival_estimates'] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][i]['arrival_estimates'].length; j++) {
                if (myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['stop_id'] == '4160738') {
                  c7s.push(myJson['ResultSet']['Result'][i]['arrival_estimates'][j]['arrival_at']);
                }
              }
            }
          }
          c7s = c7s.sort();
          if (c7s.length > 0) {
            document.getElementById("c7s1").innerHTML = moment(c7s[0],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
            if (c7s.length > 1) {
              document.getElementById("c7s2").innerHTML = moment(c7s[1],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
              if (c7s.length > 2) {
                document.getElementById("c7s3").innerHTML = moment(c7s[2],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                if (c7s.length > 3) {
                  document.getElementById("c7s4").innerHTML = moment(c7s[3],"YYYY-MM-DDTHH:mm:ss-Z").fromNow(true);
                }
              }
            }
          }
          // C8
        }
      }
    }
  );
  fetch('http://www-devl.bu.edu/nisdev/php5/bu-mobile-backend-demo/bu-mobile-backend/rpc/bus/stops.json.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      // M1 4160714
      if (m1s != undefined) {
        lastEst = moment(m1s[m1s.length-1],"YYYY-MM-DDTHH:mm:ss-Z").format("hh:mm A");
        m1e = [];
        // for (var i = 0; i < myJson['ResultSet']['Result'].length; i++) {
          // console.log(myJson['ResultSet']['Result'][i]);
          // if (myJson['ResultSet']['Result'][i]['times'] != undefined) {
            // console.log('w');
            // console.log(myJson['ResultSet']['Result'][0]['times']);
            if (myJson['ResultSet']['Result'][0] != undefined) {
              for (var j = 0; j < myJson['ResultSet']['Result'][0]['times'].length; j++) {
                // console.log('n');
                if (lastEst < myJson['ResultSet']['Result'][0]['times'][j] && myJson['ResultSet']['Result'][0]['times'][j] < "6:00 AM") {
                  // console.log(myJson['ResultSet']['Result'][0]['times'][j]);
                  // console.log(lastEst);
                  // console.log('yes');
                  m1e.push(myJson['ResultSet']['Result'][0]['times'][j]);
                }
              }
            }
        //   }
        // }
      }
    }
  );
};
proximity();
setInterval(function() { proximity() }, 5000);

// Beginning of shapes function.
function shapes() {
  shape = [];
  tor = -1;
  fetch('http://www-devl.bu.edu/nisdev/php5/bu-mobile-backend-demo/bu-mobile-backend/rpc/bus/shapes.json.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      if (myJson['ResultSet']['Result']['day_route']['active'] == true) {
        tor = 0;
        for (var i = 0; i < myJson['ResultSet']['Result']['day_route']['coords'].length; i++) {
          stops = {};
          stops["lat"] = parseFloat(myJson['ResultSet']['Result']['day_route']['coords'][i]['lat']);
          stops["lng"] = parseFloat(myJson['ResultSet']['Result']['day_route']['coords'][i]['lng']);
          shape.push(stops);
          // console.log(stops)
        }
      } else if (myJson['ResultSet']['Result']['night_route']['active'] == true) {
        tor = 1;
        for (var i = 0; i < myJson['ResultSet']['Result']['night_route']['coords'].length; i++) {
          stops = {};
          stops["lat"] = parseFloat(myJson['ResultSet']['Result']['night_route']['coords'][i]['lat']);
          stops["lng"] = parseFloat(myJson['ResultSet']['Result']['night_route']['coords'][i]['lng']);
          shape.push(stops);
          // console.log(stops)
        }
      } else if (myJson['ResultSet']['Result']['express_route']['active'] == true) {
        tor = 2;
        for (var i = 0; i < myJson['ResultSet']['Result']['express_route']['coords'].length; i++) {
          stops = {};
          stops["lat"] = parseFloat(myJson['ResultSet']['Result']['express_route']['coords'][i]['lat']);
          stops["lng"] = parseFloat(myJson['ResultSet']['Result']['express_route']['coords'][i]['lng']);
          shape.push(stops);
          // console.log(stops)
        }
      } else {
        tor = -1;
      }
      // console.log(tor);
      // console.log(myJson['ResultSet']['Result']['day_route']['coords'].length);
      // var test = myJson['ResultSet']['Result']['day_route'][0][0]['lat'];
      // console.log(test)

      // console.log(shape)
//            if (myJson['totalResultsAvailable'] > 0) {
//              console.log('ryep');
//              for (var i = 0; i < myJson['totalResultsAvailable']; i++) {
//                console.log('fyep');
//                console.log(i)
//                if (myJson['ResultSet']['Result'][i]['active'] == true) {
//                  result = [];
//                  console.log('yep');
//                  stops.push(myJson['ResultSet']['Result'][i]['lat']);
//                  stops.push(myJson['ResultSet']['Result'][i]['lng']);
//                  shape.push(result);
//                }
//              }
//            }
      busPosition();
      reloadBusPosition();
    }
  );
};
shapes();
// setInterval(function() { shapes() }, 5000);

var busShapes = [{lat: 42.352514,lng: -71.118344},{lat: 42.353600,lng: -71.118092},{lat: 42.353687,lng: -71.117968},{lat: 42.353683,lng: -71.117775}];

var busShape = [{lat: "42.352514",lng: "-71.118344"},{lat: "42.353600",lng: "-71.118092"},{lat: "42.353687",lng: "-71.117968"},{lat: "42.353683",lng: "-71.117775"},{lat: "42.353190",lng: "-71.116724"},{lat: "42.352641",lng: "-71.115673"},{lat: "42.352482",lng: "-71.115479"},{lat: "42.351745",lng: "-71.115656"},{lat: "42.351007",lng: "-71.115801"},{lat: "42.350774",lng: "-71.113768"},{lat: "42.350520",lng: "-71.111773"},{lat: "42.349834",lng: "-71.106006"},{lat: "42.348882",lng: "-71.098013"},{lat: "42.348764",lng: "-71.096972"},{lat: "42.348851",lng: "-71.092836"},{lat: "42.348545",lng: "-71.092772"},{lat: "42.347915",lng: "-71.092455"},{lat: "42.347808",lng: "-71.092359"},{lat: "42.347245",lng: "-71.092407"},{lat: "42.346948",lng: "-71.092380"},{lat: "42.346813",lng: "-71.092284"},{lat: "42.346757",lng: "-71.092166"},{lat: "42.346444",lng: "-71.091141"},{lat: "42.346301",lng: "-71.090884"},{lat: "42.346083",lng: "-71.090739"},{lat: "42.345865",lng: "-71.090669"},{lat: "42.345493",lng: "-71.090594"},{lat: "42.344831",lng: "-71.090744"},{lat: "42.344595",lng: "-71.090776"},{lat: "42.344359",lng: "-71.090744"},{lat: "42.344244",lng: "-71.090661"},{lat: "42.344109",lng: "-71.090444"},{lat: "42.343984",lng: "-71.089990"},{lat: "42.343831",lng: "-71.089124"},{lat: "42.343324",lng: "-71.085798"},{lat: "42.342773",lng: "-71.084913"},{lat: "42.342265",lng: "-71.084189"},{lat: "42.342150",lng: "-71.084124"},{lat: "42.341337",lng: "-71.082923"},{lat: "42.340572",lng: "-71.081802"},{lat: "42.340255",lng: "-71.081367"},{lat: "42.339801",lng: "-71.080916"},{lat: "42.339208",lng: "-71.080348"},{lat: "42.338391",lng: "-71.079409"},{lat: "42.337325",lng: "-71.078068"},{lat: "42.336448",lng: "-71.077027"},{lat: "42.333478",lng: "-71.073444"},{lat: "42.333569",lng: "-71.073304"},{lat: "42.333676",lng: "-71.073278"},{lat: "42.334406",lng: "-71.072205"},{lat: "42.334937",lng: "-71.071443"},{lat: "42.334985",lng: "-71.071432"},{lat: "42.335469",lng: "-71.070719"},{lat: "42.335933",lng: "-71.070080"},{lat: "42.336016",lng: "-71.070182"},{lat: "42.337495",lng: "-71.071958"},{lat: "42.338871",lng: "-71.073589"},{lat: "42.338013",lng: "-71.074844"},{lat: "42.336520",lng: "-71.076915"},{lat: "42.337892",lng: "-71.078572"},{lat: "42.338605",lng: "-71.079468"},{lat: "42.339367",lng: "-71.080353"},{lat: "42.340015",lng: "-71.080955"},{lat: "42.340564",lng: "-71.081574"},{lat: "42.340640",lng: "-71.081705"},{lat: "42.341825",lng: "-71.083459"},{lat: "42.342220",lng: "-71.084028"},{lat: "42.342265",lng: "-71.084167"},{lat: "42.342997",lng: "-71.085262"},{lat: "42.343332",lng: "-71.085787"},{lat: "42.345187",lng: "-71.086694"},{lat: "42.347975",lng: "-71.088083"},{lat: "42.349763",lng: "-71.088952"},{lat: "42.350849",lng: "-71.089489"},{lat: "42.350359",lng: "-71.091259"},{lat: "42.350115",lng: "-71.092214"},{lat: "42.349945",lng: "-71.092874"},{lat: "42.349878",lng: "-71.093308"},{lat: "42.349755",lng: "-71.093571"},{lat: "42.349204",lng: "-71.095459"},{lat: "42.349073",lng: "-71.096033"},{lat: "42.348982",lng: "-71.096522"},{lat: "42.349009",lng: "-71.097149"},{lat: "42.348997",lng: "-71.097358"},{lat: "42.349973",lng: "-71.105319"},{lat: "42.350472",lng: "-71.109428"},{lat: "42.350472",lng: "-71.109729"},{lat: "42.351543",lng: "-71.118548"},{lat: "42.352514",lng: "-71.118344"}];

for (var i = 0; i < busShape.length; i++) {
  busShape[i]["lat"] = parseFloat(busShape[i]["lat"]);
  busShape[i]["lng"] = parseFloat(busShape[i]["lng"]);
}

var map;
// setInterval(function() { test() }, 5000);
function initMap() {
  var mapOptions = {
    zoom: 15,
    center: {lat: 42.343893, lng: -71.095402},
    // mapTypeId:google.maps.MapTypeId.ROADMAP,
    // styles:[{
    //   featureType:"transit",
    //   stylers:[
    //     {hue:"#3bff00"},
    //     {saturation:-65},
    //     {visibility:"off"}
    //   ]},
    //   {featureType:"poi",stylers:[]},
    //   {stylers:[
    //     {hue:"#0091ff"},
    //     {saturation:-100}
    //   ]},
    //   {featureType:"water",
    //   stylers:[
    //     {saturation:30},
    //     {hue:"#00b2ff"}
    //   ]}],
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // console.log(liveBus);
  // console.log(liveBus.length);
  var busPath = new google.maps.Polyline({
    path: busShape,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  busPath.setMap(map);
  var image = 'https://www.bu.edu/thebus/wp-content/themes/flexi-transportation/images/map/bus-stop.png';
  // var image = 'bus_stop.png';
  // var marker, i;
  // for (i = 0; i < busShape.length; i++) {
  //   marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(busShape[i][0],busShape[i][1]),
  //     map: map,
  //     icon: image
  //   })
  // }
  var infowindow = new google.maps.InfoWindow({
    content: busId[0]
  });
  // marker.addListener('click', function() {
  //   infowindow.open(map, marker);
  //   busId.splice(1);
  // });
};
var buses = [];
function busPosition() {
  // console.log(5);
  for (var j = 0; j < liveBus.length; j++) {
    // console.log(5);
    var stop = liveBus[j];
    // console.log(stop[0],stop[1]);
    // var myLatLng = new google.maps.LatLng(stop[0],stop[1]);
    // console.log(stop[0]);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(stop[0],stop[1]),
      // animation: google.maps.Animation.BOUNCE,
      map: map,
    });
    buses.push(marker);
  };
  // console.log(buses);
};
function reloadBusPosition() {
  // Loop through markers and set map to null for each
  for (var i = 0; i < buses.length; i++) {
    buses[i].setMap(null);
  }
  // Reset the markers array
  buses = [];
  // Call set markers to re-add markers
  busPosition();
}
// busPosition();
