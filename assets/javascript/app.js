/*If most of this looks familiar its because most of it came from the TimeSheet activity*/

$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDTqycsIRPFPvEjY8YhsHiltfs8KeWEy4I",
    authDomain: "exampledb1-eb26e.firebaseapp.com",
    databaseURL: "https://exampledb1-eb26e.firebaseio.com",
    projectId: "exampledb1-eb26e",
    storageBucket: "exampledb1-eb26e.appspot.com",
    messagingSenderId: "175128661135"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding train data
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trnDest = $("#destination-input").val().trim();
  var trnTime = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var trnFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrn = {
    name: trnName,
    dest: trnDest,
    time: trnTime,
    freq: trnFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrn);

  // Logs everything to console
  console.log(newTrn.name);
  console.log(newTrn.dest);
  console.log(newTrn.time);
  console.log(newTrn.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDest = childSnapshot.val().dest;
  var trnTime = childSnapshot.val().time;
  var trnFreq = childSnapshot.val().freq;

  // Time calculation are done here.  Can't get the time to show for the first train like I want to.

  var diffTime = moment().diff(moment.unix(trnTime), "minutes");
  var timeRemainder = diffTime % trnFreq ;
  var minutes = trnFreq - timeRemainder;
  var nextTrainArrival = moment().add(minutes, "m").format("HH:mm A"); 
  
  
  // Add each train's data into the table

  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" +
  trnFreq + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td><td>" );
});
});

