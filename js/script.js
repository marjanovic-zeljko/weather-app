const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const printDate = today.toDateString();
let dateDiv = document.getElementById("todaysDate");
dateDiv.innerHTML = printDate;

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimezone = document.querySelector(".location-timezone");
    let highTemp = document.querySelector(".temperature-degree-high");
    let lowTemp = document.querySelector(".temperature-degree-low");

    let uvindex = document.querySelector(".uv-index");
    let sunrise = document.querySelector(".sunrise");
    let sunset = document.querySelector(".sunset");
    let humidity = document.querySelector(".humidity");
    let wind = document.querySelector(".wind");
    // let =document.querySelector(".");
    //  let =document.querySelector(".");

    let HeroImage = document.querySelector(".image");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.weatherapi.com/v1/forecast.json?key=ad280ab7958f4d0da17233911221401&q=${lat}, ${long}&days=7&aqi=no&alerts=no
            `

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    let forecasttoday = data.forecast.forecastday[0];
                    let uv = data.current.uv;
                    temperatureDegree.textContent = data.current.temp_c;
                    temperatureDescription.textContent = data.current.condition.text;
                    locationTimezone.textContent = data.location.name;
                    highTemp.textContent = forecasttoday.day.maxtemp_c;
                    lowTemp.textContent = forecasttoday.day.mintemp_c;
                    if (lowTemp.textContent.toString().includes('.')) {
                        lowTemp.textContent = lowTemp.textContent.substring(0, lowTemp.textContent.indexOf('.'));
                    }

                    if (highTemp.textContent.toString().includes('.')) {
                        highTemp.textContent = highTemp.textContent.substring(0, highTemp.textContent.indexOf('.'));
                    }

                    let iconpath = data.current.condition.icon.substr(29);
                    uvindex.textContent = uvCondition(uv);
                    sunrise.textContent = forecasttoday.astro.sunrise;
                    sunrise.textContent = sunrise.textContent.substring(0, sunrise.textContent.indexOf(' '));
                    sunset.textContent = forecasttoday.astro.sunset;
                    sunset.textContent = sunset.textContent.substring(0, sunset.textContent.indexOf(' '));
                    humidity.textContent = data.current.humidity;
                    wind.textContent = data.current.wind_kph;
                    setIcons(iconpath)


                    for (var i = 0; i < 24; i++) {
                        //todays tab

                        if (checkApiHour(forecasttoday.hour[i].time) == currentHour()) {
                            let matchedHour = forecasttoday.hour;
                            for (var j = 0; j < 7; j++) {
                                k = i + j

                                var hourClass = `.hour-${j}`
                                var hrcls = document.querySelector(hourClass);
                                var nextHour = currentHour() + j;
                                if (nextHour !== 24) {
                                hrcls.querySelector(":scope > .hour").textContent = nextHour + ":00";
                                    if (currentHour() + j == currentHour()) {
                                        hrcls.querySelector(":scope > .hour").textContent = "Now";
                                    }
                                    hrcls.querySelector(":scope > .degree-number").textContent = matchedHour[k].temp_c.toString() + "°C"

                                    if (hrcls.querySelector(":scope > .degree-number").textContent.toString().includes('.')) {
                                        hrcls.querySelector(":scope > .degree-number").textContent = hrcls.querySelector(":scope > .degree-number").textContent.substring(0, hrcls.querySelector(":scope > .degree-number").textContent.indexOf('.')) + "°C";
                                    }
                                    let smalliconpath = matchedHour[k].condition.icon.substr(29);
                                    setIcons(smalliconpath)
                                    hrcls.querySelector(":scope > .image").src = `../images/${smalliconpath}`

                                   
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }



                });
        });
    }

    //ikonice
    function setIcons(path) {
        HeroImage.src = `../images/${path}`

    }


    //proverava da tip uv zraka
    function uvCondition(uv) {
        if (uv == 1 || uv == 2) return "Low"
        else if (uv == 3 || uv == 4 || uv == 5) return "Moderate"
        else if (uv == 6 || uv == 7) return "High"
        else if (uv == 8 || uv == 9 || uv == 10) return "Very high"
        else return "Extreme"

    }
})

// kalkulacija vremena 

let checkApiHour = function (apiDate) {
    const d = new Date(apiDate);
    let apiHour = d.getHours()
    return apiHour;
}

let currentHour = function () {
    const d = new Date();
    let hour = d.getHours()
    return hour;

}

//tabs functionality

let tabToday = document.querySelector('.today');
let tabTommorow = document.querySelector('.tommorow');
let tabSevenDays = document.querySelector('.seven-days');
let fwcToday = document.querySelector('.fwc-today');
let fwcTommorow = document.querySelector('.fwc-tommorow');
let fwcSevenDays = document.querySelector('.fwc-seven-days')
tabToday.addEventListener('click', () => {

    tabToday.classList.remove('active');
    tabTommorow.classList.remove('active');
    tabSevenDays.classList.remove('active');
    tabToday.classList.add('active');


})

tabTommorow.addEventListener('click', () => {

    tabTommorow.classList.remove('active');
    tabToday.classList.remove('active');
    tabSevenDays.classList.remove('active');
    tabTommorow.classList.add('active');


})

tabSevenDays.addEventListener('click', () => {

    tabSevenDays.classList.remove('active');
    tabTommorow.classList.remove('active');
    tabToday.classList.remove('active');
    tabSevenDays.classList.add('active');


})