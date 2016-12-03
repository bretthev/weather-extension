const xhr = new XMLHttpRequest();
let weatherKey = 'c6f9cf80abac0cc0d08971b6c53bfc3c';
let mainText = document.querySelector('.main-text');
let currentCity;



const getLocation = () => {
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
      currentCity = response;
      mainText.innerText = `You are in ${response.name}, it's ${response.main.temp} degrees out and there are ${response.weather[0].main}.`
    }
  }
  xhr.send();
}



getLocation();
