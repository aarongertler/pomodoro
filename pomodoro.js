$(document).ready(function() {

// All of our global variables
  
  var breakTime = 300;
  var workTime = 1500,
    timer = workTime, // Start timer at the length of time for a work interval
    currentTime = timer; // Represents time left for current stage
  var nextTimer = "Break";
  var on = true;

  // Show start time when clock is loaded

  $("#timer").text(timeString(timer));
  $("#workTimer").text(timeString(workTime));
  $("#breakTimer").text(timeString(breakTime));

  // Click handler to change work/break times

  // Click handlers for the timer's buttons

  $("#start").click(countdown); // Had to figure out that this wasn't in the form "countdown()"
  $("#pause").click(pause);
  $("#stop").click(stop);
  $("#reset").click(reset);
  $("#lessWork").click(function() {
    var newTime = workTime;
    newTime -= 60;
    timer = workTime = newTime;
    $("#workTimer").text(timeString(newTime));
    $("#timer").text(timeString(newTime));
  });
  $("#moreWork").click(function() {
    var newTime = workTime;
    newTime += 60;
    timer = workTime = newTime;
    $("#workTimer").text(timeString(newTime));
    $("#timer").text(timeString(newTime));
  });
  $("#lessBreak").click(function() {
    var newTime = breakTime;
    newTime -= 60;
    breakTime = newTime;
    $("#breakTimer").text(timeString(newTime));
  });
  $("#moreBreak").click(function() {
    var newTime = breakTime;
    newTime += 60;
    breakTime = newTime;
    $("#breakTimer").text(timeString(newTime));
  });


  // All of our functions

  function reduceWorkTime() {
      // var newTime = workTime;
      // newTime ++;
      // $("#workTimer").text(timeString(newTime));
      // $("#timer").text(timeString(newTime));
      // timer = 
      //   currentTime = 
      //   workTime = newTime
      // $("#timer").text(timeString(workTime))
  }

  function timeString(time) {
    var minutes = Math.floor(time / 60)
    var seconds = time - minutes * 60

    return leadZero(minutes) + ":" + leadZero(seconds)
  }

  function leadZero(time) {
    if(time < 10) {
      return "0" + time;
    }
    else {
      return "" + time;
    }
  }

  function countdown() {
    on = true
    if (on === true) {
      on = setInterval(downtick, 1000);
        // Without "on = " in the above, our clearInterval functions won't actually stop the timer
    }

    function downtick() {
      if (timer != 0) {
        timer--;
        $("#timer").text(timeString(timer))
      }
      else {
        switch (nextTimer) {
          case "Break":
            timer = breakTime;
            nextTimer = "Work";
            break;
          case "Work":
            timer = workTime;
            nextTimer = "Break";
            break;
        }
      $("#timer").text(timeString(timer))
      }
    }
  }

  function pause() {
    clearInterval(on);
    on = false;    
    // When we accidentally wrote "on == true", it returned false and the timer wouldn't restart
    // currentTime = timer;
  }

  function stop() {
    clearInterval(on);
    on = true;
    timer = workTime;
    $("#timer").text(timeString(workTime));
    nextTimer = "Break";
  }

  // Note: The below is a placeholder function -- we might use it later if we add the ability 
  // to increase/decrease session lengths. For now, no need.

  function reset() {
    clearInterval(on);
    on = true;
    timer = workTime = 1500
    breakTime = 300
    $("#timer").text(timeString(workTime));
    $("#workTimer").text(timeString(workTime));
    $("#breakTimer").text(timeString(breakTime));
    nextTimer = "Break";
  }

});