$(document).ready(function() {
  // Initialize Firebase======================
  var config = {
    apiKey: "AIzaSyAPSedF02z_xWTV0dfPXiOTA5pQKRv5BhQ",
    authDomain: "train-schedule-672c5.firebaseapp.com",
    databaseURL: "https://train-schedule-672c5.firebaseio.com",
    projectId: "train-schedule-672c5",
    storageBucket: "train-schedule-672c5.appspot.com",
    messagingSenderId: "453576585160"
  };


firebase.initializeApp(config);
  var database = firebase.database();

//adding trains======================
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  //user input
  var trainName   = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain  = $("#first-train-input").val().trim();
  var frequency   = $("#frequency-input").val().trim();
  //temp train data======================
  var newTrain = {
    name: trainName,
    target: destination,
    start: firstTrain,
    beat: frequency,
  };
//no empty fields, try to find the right type of form fields======================
//  if(trainName && trainDestination && trainTime && trainFrequency){
  //push data to database
  database.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.target);
  console.log(newTrain.start);
  console.log(newTrain.beat);
  //}
  //clears the text-boxes======================
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  //store everything into a variable.
  var trainName   = childSnapshot.val().name;
  var destination = childSnapshot.val().target;
  var trainStart  = childSnapshot.val().start;
  var trainBeat   = childSnapshot.val().beat;

  console.log("6" + childSnapshot.val().beat);


  var timeCheck = moment(trainStart, "HH:mm").subtract(1, "years");
  var differenceOfTimes = moment().diff(moment(timeCheck), "minutes");
  var mod = differenceOfTimes % trainBeat;
  var mAway = trainBeat - mod;
  console.log("jimmy!!!!!!", differenceOfTimes);

  var arrival = moment().add(mAway, "minutes");

  // console.log("1 " + timeCheck);
  // console.log("2 " + differenceOfTimes);
  // console.log("3 " + mod);
  // console.log("4 " + mAway);
  // console.log("5 " + arrival);

  $("#train-table>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + 
      trainBeat + "</td><td>" + moment(arrival).format("HH:mm") + "</td><td>" + mAway + "</td></tr>");
  
  // display update date and time in header======================
  var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    $("#current-time").html("Last Updated: " + moment(currentTime).format("MMMM Do YYYY, hh:mm a"));
  });
});
