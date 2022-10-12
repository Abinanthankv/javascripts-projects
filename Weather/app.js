

const apikey = "d702660defc3b728234840c245d99fa7";
let lat;
let lon;
let date = [];
let cityname;
let description;
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
/*let city = "Harur";*/
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/*fetchcity(city);*/

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
function displayWeather(data) {

    description = data.current.weather[0].description;
    current_temp = data.current.temp;
    humidity = data.current.humidity;
    let dailydata = data.daily;
    console.log(data);

   for (let i = 0; i <= dailydata.length - 1; i++) {
        daily_description[i] = dailydata[i].weather[0].description;
        daily_icon[i] = dailydata[i].weather[0].icon
        date[i] = new Date(dailydata[i].dt * 1000).toDateString();
        temp_max[i] = dailydata[i].temp.max;
        temp_min[i] = dailydata[i].temp.min;

    }

    current_date = date[0];
   
    console.log(current_date);
    /*----------------------------------------------------------------------------------------*/
    /*To display curent weather condition*/
    /*------------------------------------------------------------------------------------------*/
    
   


    /*document.querySelector(".icon1").src="https://openweathermap.org/img/wn/"+icon+".png";*/

    document.querySelector(".city").innerText = cityname + ",";
    document.querySelector(".country").innerText = country;
    document.querySelector(".description").innerText = description;
   
    document.querySelector("#currentdate").innerText = current_date;
    document.querySelector("#current_temp").innerText = Math.ceil(current_temp) + "\xB0 C";
    document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
    /*----------------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------------------*/
    /*To display daily forecase data for 7 days*/
    /*--------------------------------------------------------------------------------------*/
   /* var days = document.querySelectorAll(".days");
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
        settemp_min.innerText = Math.ceil(temp_min[i + 1]) + "\xB0C"
        settemp_max.innerText = Math.ceil(temp_max[i + 1]) + "\xB0C"*/

        /*imageicons.src="https://openweathermap.org/img/wn/"+daily_icon[i+1]+".png";
    

    }*/

}


/*-----------------------------------------------------------------------------------*/

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx,{
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});