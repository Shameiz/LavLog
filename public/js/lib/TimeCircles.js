var minutes = 00;
  var seconds = 00;
  var appendSeconds = document.getElementById("seconds")
  var appendMinutes = document.getElementById("minutes")
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var Interval ;

  var d = new Date();
  var startTime = d.getTime();
  var endTime;
  var time;
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var year = d.getFullYear();
  var weekday = d.getDay();
  var weekOfYear;
  var bathroomTrip = {};

  buttonStart.onclick = function() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 1000);
  }

  buttonStop.onclick = function() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    clearInterval(Interval);
    time = seconds + minutes * 60;
    endTime = (time * 1000 + startTime);
    minutes = "00";
    seconds = "00";
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;


    bathroomTrip = {
      time : time,
      month : month,
      day : day,
      year : year,
      weekday : weekday,
      weekOfYear : weekOfYear
    }

    if (time != 0) {
      $.ajax({
        type: "POST",
        url: "/addtime",
        data: bathroomTrip
      });
    }
  }

  function startTimer () {
    seconds++;

    if(seconds < 9){
      appendSeconds.innerHTML = "0" + seconds;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }

    if (seconds > 59) {
      console.log("minutes");
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
    }

    if (minutes > 9){
      appendMinutes.innerHTML = minutes;
    }
  }
