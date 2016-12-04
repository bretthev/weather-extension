const xhr = new XMLHttpRequest();
let weatherKey = 'c6f9cf80abac0cc0d08971b6c53bfc3c';
let mainText = document.querySelector('.main-text');

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
      console.log(xhr.responseText)
      mainText.innerText = `It's ${response.main.temp} degrees out in ${response.name}.`
      getUnsplashPicture(response.main.description)
    }
  }
  xhr.send();
}

const getUnsplashPicture = (weather) => {
  xhr.open("GET", `https://api.unsplash.com/photos/random?query=${weather}&w=800&h=800&client_id=163902f30d13c54b65fef8f7605583f451ec9fd47162dc95e7f8ce2fa6fe7fb3`, true)
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let response = JSON.parse(xhr.response)
      response.urls.full ? mainText.style.backgroundImage = `url(${response.urls.full})` : null
    }
    if (xhr.readyState !== 4) { console.log('too many calls, son')}
  }
  xhr.send()
}

getLocation();
