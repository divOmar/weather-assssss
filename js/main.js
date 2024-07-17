let todayDatenum=document.getElementById("todayDatenum")
let todayDatemonth=document.getElementById("todayDatemonth")
let todayLocation=document.getElementById("todayLocation")
let todayTemp=document.getElementById("todayTemp")
let todayConImg=document.getElementById("todayConImg")
let todayConText=document.getElementById("todayConText")
let todayDateName=document.getElementById("todayDateNane")
let tomorrowDateName=document.getElementsByClassName('tomorrowDateNane')
let tomorrowDateImg=document.getElementsByClassName('tomorrowDateImg')
let tomorrowTemp=document.getElementsByClassName('tomorrowTemp')
let minTomorrowTemp=document.getElementsByClassName('minTomorrowTemp')
let tomorrowConText=document.getElementsByClassName('tomorrowConText')

let searchInput=document.getElementById("search")



async function getWeatherData(cityName){
    let weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fa04a64b56214f66b7114817241407&q=07112-${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}


function displayTodayData(info){
    let todaydate=new Date()
    todayDateName.innerHTML=todaydate.toLocaleDateString("en-us",{weekday:"long"})
    todayDatenum.innerHTML=todaydate.getDate()
    todayDatemonth.innerHTML=todaydate.toLocaleDateString("en-us",{month:"long"})
    todayLocation.innerHTML=info.location.name
    todayTemp.innerHTML=info.current.temp_c
    todayConImg.setAttribute("src",info.current.condition.icon)
    todayConText.innerHTML=info.current.condition.text
}



function displayNextdayData(info){
    let forecastdata=info.forecast.forecastday
    for(let i=0;i<2;i++){
        let nextDayData=new Date(forecastdata[i+1].date)
        tomorrowDateName[i].innerHTML=nextDayData.toLocaleDateString("en-us",{weekday:"long"})
        tomorrowDateImg[i].setAttribute("src",forecastdata[i+1].day.condition.icon)
        tomorrowConText[i].innerHTML=forecastdata[i+1].day.condition.text
        tomorrowTemp[i].innerHTML=forecastdata[i+1].day.maxtemp_c
        minTomorrowTemp[i].innerHTML=forecastdata[i+1].day.mintemp_c
    }
    
}



async function startApp(city="cairo"){
    let weatherData=await getWeatherData(city)
    displayTodayData(weatherData)
    displayNextdayData(weatherData)
}

startApp()


searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})