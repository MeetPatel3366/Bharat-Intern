let city_name=document.querySelector(".weather_city");
let city_search=document.querySelector(".weather_serach");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
let w_icon=document.querySelector(".weather_icon");
let w_temperature=document.querySelector(".wetaher_temperature");
let w_minTemp=document.querySelector(".weather_min")
let w_maxTemp=document.querySelector(".weather_max");
let w_feelsLike=document.querySelector(".weather_feelsLike");
let w_humidity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let w_pressure=document.querySelector(".weather_pressure");

let city="pune";
city_search.addEventListener("submit",(e)=>{
    e.preventDefault()
    let cityName=document.querySelector(".city_name");
    console.log(cityName.value);
    city=cityName.value;
    getWeatherData();
    cityName="";
})

const getCountryName=(code)=>{
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' }); 

    return regionNamesInEnglish.of(code);
}

const getDateTime=(dt)=>{

    const curDate=new Date(dt*1000)  //convert seconds to milliseconds
    console.log(curDate);

    const option={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    };
    const formatter=new Intl.DateTimeFormat("en-US",option);
    return formatter.format(curDate);
}


const getWeatherData= async()=>{
    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a2907a7aa6e8e0b0addf942955ab2e4`;
    try 
    {
        const res=await fetch(weatherUrl);
        const data=await res.json();
        console.log(data);
        const {main,name,weather,wind,sys,dt}=data;
        console.log(dt);
        console.log(sys.country);
        city_name.innerHTML=`${name},${getCountryName(sys.country)}`;
        dateTime.innerHTML=getDateTime(dt);
        w_forecast.innerHTML=`${weather[0].main}`;
        w_icon.innerHTML=`<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png">`;
        w_temperature.innerHTML=`${main.temp}&#176`;
        w_minTemp.innerHTML=`Min : ${main.temp_min.toFixed()}&#176`;
        w_maxTemp.innerHTML=`Max : ${main.temp_max.toFixed()}&#176`;
        w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML=`${main.humidity}%`;
        w_wind.innerHTML=`${wind.speed} m/s`;
        w_pressure.innerHTML=`${main.pressure} hPa`
    }
    catch(error)
    {
        console.log(error);
    }
}

document.body.addEventListener('load',getWeatherData())