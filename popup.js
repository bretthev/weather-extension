const xhr = new XMLHttpRequest();
let weatherKey = 'c6f9cf80abac0cc0d08971b6c53bfc3c';
let mainText = document.querySelector('.main-text');
let localWeather = document.querySelector('.local-weather');
let backgroundImage;

const clearUrl = 'https://unsplash.com/search/clear-sky?photo=fuAy6Gs8QCw';
const cloudUrl = 'https://unsplash.com/search/cloudy?photo=S7ChB4FBboI';
const rainUrl = 'https://unsplash.com/search/rain?photo=vg6zo_GJf1k';
const snowUrl = 'https://unsplash.com/search/snow?photo=67t2GJcD5PI';

const getAndDisplayWeather = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation = position.coords
      getLocalWeather(position.coords.latitude, position.coords.longitude)
    })
  }
}

const getLocalWeather = (latitude, longitude) => {
  xhr.open("GET", `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=imperial`, true);
  xhr.onreadystatechange =  () => {
    if (xhr.readyState == 4) {
      const response = JSON.parse(xhr.responseText);
      mainText.innerText = `It's ${response.main.temp} degrees in ${response.name} and ${response.weather[0].main.toLowerCase()}.`
      updateBackground(response.weather[0].main)
    }
  }
  xhr.send();
}

const setDefaultBackground = (weather) => {
  weather.toLowerCase().includes('rain') ? localWeather.style.background = `url(${rainUrl}) no-repeat center center fixed` : null;
  weather.toLowerCase().includes('clear') ? localWeather.style.background = `url(${clearUrl}) no-repeat center center fixed` : null;
  weather.toLowerCase().includes('snow') ? localWeather.style.background = `url(${snowUrl}) no-repeat center center fixed` : null;
  weather.toLowerCase().includes('cloud') ? localWeather.style.background = `url(${cloudUrl}) no-repeat center center fixed` : null;
}

const updateBackground = (weather) => {
  xhr.open("GET", `https://api.unsplash.com/photos/random?query=${weather}&client_id=163902f30d13c54b65fef8f7605583f451ec9fd47162dc95e7f8ce2fa6fe7fb3`, true)
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let response = JSON.parse(xhr.response)
      response.urls.full ? localWeather.style.background = `url(${response.urls.regular}) no-repeat center center fixed` : null
    }
    else {
      setDefaultBackground(weather)
    }
  }
  xhr.send()
}

getAndDisplayWeather()
