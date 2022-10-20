
let currentuvindex;
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
let sunrise;
let sunset;
var dailydata;
var displayweekly=[];
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


fetchcity("harur");





/**--------------------------------------------------------------------------------------------- */

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

/**----------------------------------------------------------------------------------------------------- */

function displayWeather(data) {
    description = data.current.weather[0].description;
    current_temp = data.current.temp;
    humidity = data.current.humidity;
    dailydata = data.daily;
    
    var sunrise=new Date(data.current.sunrise*1000);
    
    
    var sunrisehour=sunrise.getHours();
    var riseAmOrPm = sunrisehour >= 12 ? 'Pm' : 'Am';
    sunrisehour=(sunrisehour%12) || 12;
    sunrisehour=sunrisehour<10? '0'+sunrisehour: sunrisehour;
   
    var sunriseminute=sunrise.getMinutes();
    sunriseminute=sunriseminute<10? '0'+sunriseminute: sunriseminute;
    var sunrisetime=sunrisehour +":"+sunriseminute +" "+ riseAmOrPm;
    var sunset=new Date(data.current.sunset*1000);
    var sunsethour=sunset.getHours();
    sunsethour=(sunsethour%12) || 12;
    sunsethour=sunsethour<10? '0'+sunsethour: sunsethour;
    var sunsetminute=sunset.getMinutes();
    sunsetminute=sunsetminute<10? '0'+sunsetminute: sunsetminute;
    var sunsettime=sunsethour +":"+sunsetminute +" "+"Pm";

    
    
   
    
   currentuvindex=data.current.uvi;
    weeklydata(dailydata);
    console.log(data)
    console.log(sunsettime,sunrisetime)
    var bar=document.querySelector(".barOverflow");
   
    console.log(bar)
    
    console.log(hour)
    
    
  
    
   

    
    
   
    /*----------------------------------------------------------------------------------------*/
    /*To display current weather condition*/
    /*------------------------------------------------------------------------------------------*/
    /*document.querySelector(".icon1").src="https://openweathermap.org/img/wn/"+icon+".png";*/
    document.querySelector(".city").innerText = cityname + ",";
    document.querySelector(".country").innerText = country;
    document.querySelector(".description").innerText = description;
    document.querySelector("#current_temp").innerText = Math.ceil(current_temp) ;
    document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
    document.querySelector("#currentday").innerText = current_day+",";
    document.querySelector("#currenttime").innerText = current_time;
    document.querySelector("#currentdate").innerText = currentdate;
    document.querySelector(".icon1").src= iconurl(description);
    document.querySelector(".mini-icon").src= iconurl(description);
    document.querySelector(".sunrise").innerHTML=sunrisetime;
    document.querySelector(".sunset").innerHTML=sunsettime;

    /*----------------------------------------------------------------------------------*/
return currentuvindex;
}
/*-------------------------------------------------------------------------------------*/
    /*To display daily forecase data for 7 days*/
    /*--------------------------------------------------------------------------------------*/
   function iconurl(description)
   {
    if(description.includes("clouds"))
    {
        return("icons/overcastclouds.svg");
    }
    if(description.includes("haze"))
    {
        return("icons/haze.svg");
    }
    if(description.includes("mist"))
    {
        return("icons/mist.svg");
    }
    if(description.includes("rain"))
    {
        return("icons/rain.svg");
    }
    if(description.includes("snow"))
    {
        return("icons/snow.svg");
    }
    if(description.includes("clear"))
    {
        return("icons/clearsky.svg");
    }


   }


function weeklydata(data){
    
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 
    for (let i = 0; i <=data.length - 1; i++) {
        daily_description[i] = dailydata[i].weather[0].description;
        daily_icon[i] = dailydata[i].weather[0].icon
        date[i] = new Date(dailydata[i].dt * 1000).getDay();
        temp_max[i] = dailydata[i].temp.max;
        temp_min[i] = dailydata[i].temp.min;
        
     
    }
    const days=[
        {
            id:'day1',
            icon:iconurl(daily_description[1]),
            date:weekday[date[1]],
            min:temp_min[1],
            max:temp_max[1]
        },
        {
            id:'day2',
            icon:iconurl(daily_description[2]),
            date:weekday[date[2]],
            min:temp_min[2],
            max:temp_max[2]
        },
        {
            id:'day3',
            icon:iconurl(daily_description[3]),
            date:weekday[date[3]],
            min:temp_min[3],
            max:temp_max[3]
        },
        {
            id:'day4',
            icon:iconurl(daily_description[4]),
            date:weekday[date[4]],
            min:temp_min[4],
            max:temp_max[4]
        },
        {
            id:'day5',
            icon:iconurl(daily_description[5]),
            date:weekday[date[5]],
            min:temp_min[5],
            max:temp_max[5]
        },
        {
            id:'day6',
            icon:iconurl(daily_description[6]),
            date:weekday[date[6]],
            min:temp_min[6],
            max:temp_max[6]
        },
        {
            id:'day7',
            icon:iconurl(daily_description[7]),
            date:weekday[date[7]],
            min:temp_min[7],
            max:temp_max[7]
        }
        
        
    
    ]
    
    let daily=days.map(function (item)
    {
        return ` <div class="weekly">
        <div class="day">${item.date}</div> 
        <img src=${item.icon} class="dailyicon" alt="">
        <div>
        <span class="tempmax">${Math.ceil(item.max)+"\xB0"}</span>
        <span class="tempmin">${Math.ceil(item.min)+"\xB0"}</span>
        
        </div>
        
        </div>`
        ;
    }
    );
    daily=daily.join(" ");
    
    const weeklyweather=document.querySelector(".weeklyweather");
    weeklyweather.innerHTML=daily;
    
    
  
}

   
           
    

    






   
        
        

    
    
 
     
    
   




   





    
   

/*-----------------------------------------------------------------------------------*/


    
        
   
        
        
    
 
  

    

