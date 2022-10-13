

const apikey = "d702660defc3b728234840c245d99fa7";
let lat;
let lon;
let date = [];
let cityname;
let description;
let hourly_temp=[];
let daily_description = [];
let daily_icon = [];
let temp_min = [];
let temp_max = [];
let current_temp;

let country;
let icon;
let icons = [];
let src;
let condition = [];
let intensity = [];
let humidity;
let current_date;
/* To get day,date,time*/ 
/*-----------------------------------------------------------------------*/ 
var current_time;
var today=new Date();
var day=today.getDay();
var currentdate=today.getDate();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var current_day=weekday[day];
var hour=today.getHours();
var minutes=today.getMinutes();
if(minutes<10){
    current_time=hour+":0"+minutes;  
}
else{
    current_time=hour+":"+minutes;
}

console.log(minutes);
/**--------------------------------------------------------------------------------------------- */
let city = "Harur";

fetchcity(city);

function searchcity() {

    city = document.getElementById("search").value;
    fetchcity(city);
}


function fetchcity(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid=" + apikey)
        .then((response) => response.json())
        .then((data) => citycoordinate(data));

};
function citycoordinate(data) {
    lat = data.coord.lat;
    lon = data.coord.lon;
    icon = data.weather[0].icon;
    country = data.sys.country;
    cityname = data.name
    fetchWeather(lat, lon);
}
function fetchWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
        + lat
        + "&lon=" + lon
        + "&units=metric&appid=" + apikey)
        .then((response) => response.json())
        .then((data) => displayWeather(data));
        

}
/**To display icon based on description */
function doesFileExist(urlToFile)
{
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        if(description.includes("clouds"))
        {
            document.querySelector(".icon1").src="icons/overcast clouds.svg";  
        }
        else if(description.includes("rain"))
        {
            document.querySelector(".icon1").src="icons/rain.svg";
        }
        else if(description.includes("snow"))
        {
            document.querySelector(".icon1").src="icons/snow.svg";
        }
        else if(description.includes("hail"))
        {
            document.querySelector(".icon1").src="icons/hail.svg";
        }
        else if(description.includes("haze"))
        {
            document.querySelector(".icon1").src="icons/haze.svg";
        }
        else if(description.includes("thunderstorms"))
        {
            document.querySelector(".icon1").src="icons/thunderstorms.svg";
        }
        else if(description.includes("fog"))
        {
            document.querySelector(".icon1").src="icons/fog.svg";
        }
        else if(description.includes("clear"))
        {
            document.querySelector(".icon1").src="icons/clear sky.svg";
        }
        
    } else {
        console.log(document.querySelector('.icon2'));
        document.querySelector(".icon1").src="icons/"+description+".svg";
        document.querySelector(".mini-icon").src="icons/"+description+".svg";
        
        

    }
}
/**----------------------------------------------------------------------------------------------------- */

function displayWeather(data) {
    description = data.current.weather[0].description;
    current_temp = data.current.temp;
    humidity = data.current.humidity;
    let dailydata = data.daily;
    let hourlydata=data.hourly;
    doesFileExist("icons/"+description+".svg")
    console.log(data);
   
   for (let i = 0; i <= dailydata.length - 1; i++) {
        daily_description[i] = dailydata[i].weather[0].description;
        daily_icon[i] = dailydata[i].weather[0].icon
        date[i] = new Date(dailydata[i].dt * 1000).toDateString();
        temp_max[i] = dailydata[i].temp.max;
        temp_min[i] = dailydata[i].temp.min;

    }
    current_date = date[0];
    
    console.log(current_day);
    /*----------------------------------------------------------------------------------------*/
    /*To display curent weather condition*/
    /*------------------------------------------------------------------------------------------*/
    /*document.querySelector(".icon1").src="https://openweathermap.org/img/wn/"+icon+".png";*/
    document.querySelector(".city").innerText = cityname + ",";
    document.querySelector(".country").innerText = country;
    document.querySelector(".description").innerText = description;
    document.querySelector("#currentdate").innerText = current_date;
    document.querySelector("#current_temp").innerText = Math.ceil(current_temp) ;
    document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
    document.querySelector("#currentday").innerText = current_day+",";
    document.querySelector("#currenttime").innerText = current_time;
    document.querySelector("#currentdate").innerText = currentdate;
    
    
   console.log(location);
    
    
    /*----------------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------------------*/
    /*To display daily forecase data for 7 days*/
    /*--------------------------------------------------------------------------------------*/
    var days = document.querySelectorAll(".days");
    var classes = document.querySelectorAll(".icon");
    var dates = document.querySelectorAll(".date");
    var desc = document.querySelectorAll(".desc");
    var dailytemp_max = document.querySelectorAll(".temp_max");
    var dailytemp_min = document.querySelectorAll(".temp_min");
    for (let i = 0; i <= days.length - 1; i++) {
        let imageicons = (classes[i]);
        let setdate = dates[i];
        let setdesc = desc[i];

        let settemp_max = dailytemp_max[i];
        let settemp_min = dailytemp_min[i];
        if (daily_description[i + 1].includes("clouds")) {

            imageicons.src = "icons/overcast clouds.svg";
        }
        if (daily_description[i + 1].includes("rain")) {

            imageicons.src = "icons/rain.svg";
        }
        if (daily_description[i + 1].includes("snow")) {
            imageicons.src = "icons/snow.svg";
        }
        if (daily_description[i + 1].includes("hail")) {
            imageicons.src = "icons/hail.svg";
        }
        if (daily_description[i + 1].includes("haze")) {
            imageicons.src = "icons/haze.svg";
        }
        if (daily_description[i + 1].includes("clear")) {
            imageicons.src = "icons/clear sky.svg";
        }
        if (daily_description[i + 1].includes("smoke")) {
            imageicons.src = "icons/smoke.svg";
        }
        if (daily_description[i + 1].includes("fog")) {
            imageicons.src = "icons/fog.svg";
        }
        if (daily_description[i + 1].includes("thunderstorms")) {
            imageicons.src = "icons/thunderstorms.svg";
        }






        setdate.innerText = weekday[date[i + 1].getDay()]
        setdesc.innerText = daily_description[i + 1];
        settemp_min.innerText = Math.ceil(temp_min[i + 1]) + "\xB0C";
        settemp_max.innerText = Math.ceil(temp_max[i + 1]) + "\xB0C";

        imageicons.src="https://openweathermap.org/img/wn/"+daily_icon[i+1]+".png";
    

    }

}


/*-----------------------------------------------------------------------------------*/
window.addEventListener("DOMContentLoaded",function(){
   

    });

