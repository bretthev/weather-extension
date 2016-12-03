const xhr = new XMLHttpRequest();
let weatherKey = 'c6f9cf80abac0cc0d08971b6c53bfc3c';
let mainText = document.querySelector('.main-text');
let currentLocation;


const getLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation = position.coords
      getLocalWeather(currentLocation.latitude, currentLocation.longitude)
    })
  }
}

const getLocalWeather = (latitude, longitude) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`,
    { method: 'GET', mode: 'cors'})
  .then((response) => {
    //this response doesn't have a body but all the status is OK and that's the right api. Any idea what's wrong?
    console.log(response)
  })
  .catch(function(err) {
  });
}





getLocation();
