
function searchcity() {

    city = document.getElementById("search").value;
    fetchcity(city);
}

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


/**--------------------------------------------------------------------------------------------- */
let city = "Harur";

fetchcity(city);




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
// function doesFileExist(urlToFile)
{
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        if(description.includes("clouds"))
        {
            document.querySelector(".icon1").src="icons/overcastclouds.svg";  
            document.querySelector(".mini-icon").src="icons/overcastclouds.svg";
            
        }
        else if(description.includes("rain"))
        {
            document.querySelector(".icon1").src="icons/rain.svg";
            document.querySelector(".mini-icon").src="icons/rain.svg";
            
        }
        else if(description.includes("snow"))
        {
            document.querySelector(".icon1").src="icons/snow.svg";
            document.querySelector(".mini-icon").src="icons/snow.svg";
            
        }
        else if(description.includes("hail"))
        {
            document.querySelector(".icon1").src="icons/hail.svg";
            document.querySelector(".mini-icon").src="icons/hail.svg";
            
        }
        else if(description.includes("haze"))
        {
            document.querySelector(".icon1").src="icons/haze.svg";
            document.querySelector(".mini-icon").src="icons/haze.svg";
            
        }
        else if(description.includes("thunderstorms"))
        {
            document.querySelector(".icon1").src="icons/thunderstorms.svg";
            document.querySelector(".mini-icon").src="icons/thunderstorms.svg";
            
        }
        else if(description.includes("fog"))
        {
            document.querySelector(".icon1").src="icons/fog.svg";
            document.querySelector(".mini-icon").src="icons/fog.svg";
            
        }
        else if(description.includes("clear"))
        {
            document.querySelector(".icon1").src="icons/clearsky.svg";
            document.querySelector(".mini-icon").src="icons/clearsky.svg";
            
        }
        else if(description.includes("mist"))
        {
            document.querySelector(".icon1").src="icons/mist.svg";
            document.querySelector(".mini-icon").src="icons/mist.svg";
            
        }
        
        
        
    }
     else {
        
        document.querySelector(".icon1").src="icons/"+description+".svg";
        document.querySelector(".mini-icon").src="icons/"+description+".svg";
        
        
        
        
        

    }
    
    

}//
/**----------------------------------------------------------------------------------------------------- */

function displayWeather(data) {
    description = data.current.weather[0].description;
    current_temp = data.current.temp;
    humidity = data.current.humidity;
    dailydata = data.daily;
    weeklydata(dailydata);
   
  
    /*doesFileExist("icons/"+description+".svg")*/
    
   

    
    
   
    /*----------------------------------------------------------------------------------------*/
    /*To display curent weather condition*/
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

    
    
   
    
    
    /*----------------------------------------------------------------------------------*/

    

      

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
    console.log(days)
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


    
        
   
        
        
    
 
  

    

