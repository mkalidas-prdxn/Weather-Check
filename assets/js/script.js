//=> Hamburger menu functionality
var hamburger = document.getElementById("hamburger"),
    hamMenuOpen = document.querySelector(".menu"),
    menuBarBackground = document.querySelector(".main-bar-url");
hamburger.addEventListener("click", cross);
//Hambuger functiom to open and close menu
function cross() {
  document.body.classList.toggle("body"); //to stop scrolling when menu open
  hamburger.classList.toggle("activeHam");
  hamMenuOpen.classList.toggle("hamMenuOpen");
  menuBarBackground.classList.toggle("menuBarBackground");
}

//=> Display error msg for forms 
function errorFunc(errorId, msg, errorClass) {
  if (!document.querySelector("." + errorClass)) {
    //Give error message
    node = document.createElement("Span");
    textnode = document.createTextNode(msg);
    node.appendChild(textnode);
    node.setAttribute("class", errorClass);
    document.getElementById(errorId).appendChild(node);
  }
}

//=> To see which html page is currently accessing javascript
if (document.URL.includes("index.html")) {
  //set autocomplete => off for location and email
  document.getElementById("location").setAttribute("autocomplete", "off");
  document.getElementById("email").setAttribute("autocomplete", "off");
  var submit = document.getElementById("submit"),
    letters = /^[A-Za-z\s]+$/;

  //=> display default city as mumbai
  document.addEventListener("DOMContentLoaded", function() {
    cardDisplay("mumbai");
  });

  //=> display user submitted city weather information
  submit.addEventListener("click", function(e) {
    e.preventDefault();
    // to get user submitted value
    var location = document.forms["RegForm"]["location"].value;
    //to add fading animation while changing data
    document.querySelector(".weather-body").className += " weather-fade";
    //calling the cardDisplay function to show weather of city
    cardDisplay(location);
    //resetting the form input value
    document.getElementById("location").value = null;
  });

  //=> Function to display weather information on card
  function cardDisplay(location) {
    var node,
      textnode,
      nameValue,
      timestamp,
      time,
      date,
      months,
      month,
      days,
      day,
      humidity,
      wind,
      direction,
      tempValue,
      weatherIcon;
    //to check wether entered data is not empty or incorrect
    if (location.length == 0 || !letters.test(location)) {
      errorFunc("formBar", "Please enter correct city name", "errorMsg");
    } else {
      //Get weather information from openWeather api
      fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=83810246bd176b904dafa20374e15bec"
        )
        .then((response) => response.json())
        .then((data) => {
          nameValue = data["name"];
          timestamp = data["dt"];
          time = new Date(parseInt(timestamp) * 1000);
          date = time.getDate();
          months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          month = months[time.getMonth()];
          days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          day = days[time.getDay()];
          humidity = data["main"]["humidity"];
          wind = data["wind"]["speed"];
          direction = data["wind"]["deg"];
          tempValue = (data["main"]["temp"] - 273).toFixed(0);
          weatherIcon = data["weather"][0]["main"];

          //Display weather information on html weather card
          document.querySelector(".day").innerHTML = day;
          document.querySelector(".date").innerHTML = date + " " + month;
          document.querySelector(".location").innerHTML = nameValue;
          document.querySelector(".num").innerHTML =
            tempValue + "<sup>o</sup>C";
          document.querySelector(".humidity").innerHTML = humidity + "%";
          document.querySelector(".wind").innerHTML = wind + "m/sec";
          document.querySelector(".direction").innerHTML =
            direction + " &#7506;";

          var urlSnap; //To load correct weather icon
          switch (weatherIcon) {
            case "Mist":
              urlSnap = "7";
              break;
            case "Smoke":
              urlSnap = "7";
              break;
            case "Haze":
              urlSnap = "7";
              break;
            case "Broken-clouds":
              urlSnap = "3";
              break;
            case "Clouds":
              urlSnap = "5";
              break;
            case "Clear":
              urlSnap = "1";
              break;
            case "Rain":
              urlSnap = "14";
              break;
            case "Thunderstorm":
              urlSnap = "12";
              break;
            case "Drizzle":
              urlSnap = "13";
              break;
            default:
              urlSnap = "1";
          }
          document.getElementById("weather-icon").src =
            "assets/images/icons/icon-" + urlSnap + ".svg";

          document
            .querySelector(".weather-body")
            .classList.remove("weather-fade");

          if (document.querySelector(".errorMsg")) {
            document.querySelector(".errorMsg").remove();

          }
        })


        //To display error message when api fails or the value submitted by user is not equivalent to any city name
        .catch(function(err) {
          errorFunc("formBar", "Error fetching the data or incorrect city name", "errorMsg");
        });
    }
  }

