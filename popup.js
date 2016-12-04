const xhr = new XMLHttpRequest();
let weatherKey = 'c6f9cf80abac0cc0d08971b6c53bfc3c';
let mainText = document.querySelector('.main-text');

let currentCity;

// const unsplash = new Unsplash({
//   applicationId: "ID 163902f30d13c54b65fef8f7605583f451ec9fd47162dc95e7f8ce2fa6fe7fb3",
//   callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
//   bearerToken: "19f79eb91a56ded9145c15e9ab1ea225405bc13a98f1909a4910afc9c5bdc226"
// });


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
      console.log(JSON.parse(xhr.response))
      let image = JSON.parse(xhr.response).urls.full
      mainText.style.backgroundImage = `url(${image})`
    }
  }
  xhr.send()
}

// https://api.unsplash.com/photos/random
// urn:ietf:wg:oauth:2.0:oob
// ?client_id=YOUR_APPLICATION_ID


getLocation();
