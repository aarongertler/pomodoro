$(document).ready(function() {

// All of our global variables

  var workTime = 1500;
  var breakTime = 300;
  var timer = workTime;
  var currentTime = timer;
  var nextTimer = "Break";
  var on = true;

  $("#clock").text(timeString(workTime));


  // Click handlers

  $("#start").click(countdown);

    // I spent nearly an hour figuring out that these weren't supposed to be in the form "countdown()"

  $("#pause").click(pause);

  $("#stop").click(stop);
  $("#reset").click(reset);


  // All of our functions

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
    if (on === true) {
      timer = currentTime;
      on = setInterval(downtick, 1000);
        // Without "on = " in the above, our clearInterval functions won't actually stop the timer
    }

    function downtick() {
      if (timer != 0) {
        timer--;
        $("#clock").text(timeString(timer))
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
      $("#clock").text(timeString(timer))
      }
    }
  }

  function pause() {
    clearInterval(on);
    on = true;    
    // When we accidentally wrote "on == true", it returned false and the timer wouldn't restart
    currentTime = timer;
  }

  function stop() {
    clearInterval(on);
    on = true;
    timer = workTime;
    $("#clock").text(timeString(workTime));
    nextTimer = "Break";
  }

  // Note: The below is a placeholder function -- we might use it later if we add the ability 
  // to increase/decrease session lengths. For now, no need.

  function reset() {
    clearInterval(on);
    on = true;
    timer = workTime = 1500
    $("#clock").text(timeString(workTime));
    nextTimer = "Break";
  }

});