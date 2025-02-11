const API_KEY = "045d1e8f7d9bc8cbf59eec7cc1db2f20";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

const cityName = document.getElementById("inputCity");
const button = document.querySelector("button");
const h1 = document.getElementById("city");
const temp = document.getElementById("temp");
const weatherIcon = document.querySelector("#weatherIcon")
const description = document.getElementById("description");
const errorMessage = document.getElementById("errorMessage")
function getWeather(city) {
    fetch(URL + city)
        .then((res) => res.json())
        .then((data) => {
            h1.innerText = data.name;
            temp.innerText = `${data.main.temp}°c`;

            description.innerText = data.weather[0].description;

            let temperatur = data.main.temp;
            if (temperatur <= 0) {
                weatherIcon.src = "images/snow.png";
            } else if (temperatur > 0 && temperatur <= 10) {
                weatherIcon.src = "Images/rainy.png";
            } else if (temperatur > 10 && temperatur <= 20) {
                weatherIcon.src = "Images/cloud.png";
            }
            else {
                weatherIcon.src = "Images/sunny.png";
            }
        });

}
button.addEventListener("click", () => {

    getWeather(cityName.value);

    /*  if (cityName = ""
  
          || cityName.value= undefined){
      errorMessage.innerText = "write a city name";
  }else {
  */
});