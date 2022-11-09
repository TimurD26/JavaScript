// название города;
// ■ название страны;
// ■ время последнего обновления погоды;
// ■ температуру в градусах Цельсия;
// ■ иконку;
// ■ текстовое описание иконки;
// ■ скорость ветра в км/час;
// ■ количество осадков в милиметрах;
// ■ давление в миллибарах.
// http://api.weatherstack.com/current?access_key=5106426c92fee6b0fc992e8637817f5a&query=New%20York
// api.openweathermap.org/data/2.5/forecast?lat={43.25}&lon={76.95}&appid={3ae16b5f2fc8cb5c9331b1a76e59530d}
// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
// http://api.weatherapi.com/v1/forecast.json?key=6b3c37c4020b45d2afa163648223010&q=Almaty&days=5&aqi=no&alerts=no


function getItem() {
    $.get(`http://api.weatherstack.com/current?access_key=62c13493db3b95afa39bb3a30433bd1a&query=Almaty`, function(response) { 
        http://api.weatherstack.com/current?access_key=62c13493db3b95afa39bb3a30433bd1a&query=New%20York
        console.log(response);
        $('#posts').append(addCurrent(response));
    });
}
getItem();

function getItemWithCity(city) {
    $.get(`http://api.weatherstack.com/current?access_key=62c13493db3b95afa39bb3a30433bd1a&query=${city}`, function(response) {  
        console.log(response);
        $('#posts').html('');
        $('#posts').append(addCurrent(response));
        
    });
    
}


function getINearByCity() {
    $.get(`http://api.weatherstack.com/current?access_key=62c13493db3b95afa39bb3a30433bd1a&query=Bishkek`, function(response) {  
        console.log(response);
      
            $('#cell').append(addNearByCity(response));
    });
    $.get(`http://api.weatherstack.com/current?access_key=62c13493db3b95afa39bb3a30433bd1a&query=Tashkent`, function(response) {  
        console.log(response);
       
            $('#cell').append(addNearByCity(response));
    });
    $.get(`http://api.weatherstack.com/current?access_key=62c13493db3b95afa39bb3a30433bd1a&query=Shymkent`, function(response) {  
        console.log(response);
            $('#cell').append(addNearByCity(response));
    });
    $.get(`http://api.weatherstack.com/current?access_key=62c13493db3b95afa39bb3a30433bd1a&query=Taldykorgan`, function(response) {  
        console.log(response);
       
            $('#cell').append(addNearByCity(response));
    });
}
getINearByCity();

function getForecast() {
    $.get(`http://api.weatherapi.com/v1/forecast.json?key=6b3c37c4020b45d2afa163648223010&q=Almaty&days=1&aqi=no&alerts=no`, function(response) {  
        console.log(response.forecast.forecastday[0].hour[21]);
        console.log(response.forecast.forecastday[0]);
        for(let i=19;i<24;i++){
            $('#items1').append(addForecast(response,i));
        }
    });
}
getForecast();

function getForecastSunday() {
    $.get(`http://api.weatherapi.com/v1/forecast.json?key=6b3c37c4020b45d2afa163648223010&q=Almaty&days=2&aqi=no&alerts=no`, function(response) {  
        console.log(response.forecast.forecastday[1].hour[21]);
        console.log(response.forecast.forecastday[1]);
        for(let i=19;i<24;i++){
            $('#sunday').append(addForecastSunday(response,i));
        }
    });
}
getForecastSunday();

$("#searchbtn").click(function () {
    inputSearch = $("#inputSearch6").val();
    getItemWithCity(inputSearch);
});
// function addCurrentCityName()
// {
//     return ``
// }
function getForecastDays() {
    $.get(`http://api.weatherapi.com/v1/forecast.json?key=6b3c37c4020b45d2afa163648223010&q=Almaty&days=5&aqi=no&alerts=no`, function(response) {  
        console.log(response);
        for(let i=0;i<5;i++){
            $('#days').append(addForecastDays(response,i));
        }
    });
}
getForecastDays();

function addForecastDays(response,i)
{
    console.log(response.current);
    return `
    <div class="col-lg-2">
   

    <p>${response.forecast.forecastday[`${i}`].date}</p>
    <div class="rounded"><img src="http:${response.forecast.forecastday[`${i}`].day.condition.icon}" /> </div>
    <p>${response.forecast.forecastday[`${i}`].day.avgtemp_c} C</p>
    </div>
    `
}



function addCurrent(response)
{
    console.log(response.current);
    $('#inputSearch6').val(`${response.location.name},${response.location.country}`);
    return `
    <div class="row justify-content-md-center" >
        <div class="col-lg-3">
        <h2>${response.location.name},${response.location.country}</h2>
        </div>
        <div class="col-lg-3">
        <p>${response.current.observation_time}</p>
        </div>
    </div>
    <div class="row justify-content-md-center" >
        <div class="col-lg-2">
            <div class="rounded"><img src="${response.current.weather_icons[0]}" /> </div>
            <p>${response.current.weather_descriptions[0]}</p>
        </div>
        <div class="col-lg-2">
            <h5>${response.current.temperature} C</h5>
        </div>
        <div class="col-lg-2">
            <p>Wind: ${response.current.wind_speed} kph</p>
            <p>Precip: ${response.current.precip} mm</p>
            <p>Pressure: ${response.current.pressure} mb</p>
        </div>
    </div>
    `
}
function addForecast(response,i)
{
    console.log(response.current);
    return `
    <div class="col-lg-2">

    <p>${response.forecast.forecastday[0].hour[`${i}`].time}</p>
    <div class="rounded"><img src="http:${response.forecast.forecastday[0].hour[`${i}`].condition.icon}" /> </div>
    <p>${response.forecast.forecastday[0].hour[`${i}`].condition.text}</p>
    <p>${response.forecast.forecastday[0].hour[`${i}`].temp_c} C</p>
    <p>${response.forecast.forecastday[0].hour[`${i}`].feelslike_c} C</p>
    <p>${response.forecast.forecastday[0].hour[`${i}`].wind_dir} ${response.forecast.forecastday[0].hour[`${i}`].wind_kph}</p>
    
    </div>
    `
}

function addForecastSunday(response,i)
{
    console.log(response.current);
    return `
    <div class="col-lg-2">

    <p>${response.forecast.forecastday[1].hour[`${i}`].time}</p>
    <div class="rounded"><img src="http:${response.forecast.forecastday[0].hour[`${i}`].condition.icon}" /> </div>
    <p>${response.forecast.forecastday[1].hour[`${i}`].condition.text}</p>
    <p>${response.forecast.forecastday[1].hour[`${i}`].temp_c} C</p>
    <p>${response.forecast.forecastday[1].hour[`${i}`].feelslike_c} C</p>
    <p>${response.forecast.forecastday[1].hour[`${i}`].wind_dir} ${response.forecast.forecastday[1].hour[`${i}`].wind_kph}</p>
    
    </div>
    `
}

function addNearByCity(response)
{
    console.log(response.current);
    return `
    <div class="col-lg-2">
    <p>${response.location.name}</p>
    <div class="rounded"><img src="${response.current.weather_icons[0]}" /> </div>
    <p>${response.current.temperature}</p>
    </div>
    `
}