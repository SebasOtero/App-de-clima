// Selecciona el elemento con la clase 'title' y el elemento 'body' del documento
let titleLogo = document.querySelector(".title");
let bodyElem = document.querySelector("body");

// Al cargar la ventana
window.addEventListener("load", () => {
  // Genera un número aleatorio entre 1 y 5
  let randNum = Math.ceil(Math.random() * 5);
  // Establece una imagen de fondo en el 'body' usando el número aleatorio
  bodyElem.style.backgroundImage = `url('images/bg${randNum}.jpg')`;
  // Si el número aleatorio es 3, 4 o 5, cambia el color del texto en el elemento con la clase 'title' a blanco
  if (randNum == 3 || randNum == 4 || randNum == 5) {
    titleLogo.style.color = "white";
  }
});

// Selecciona el campo de entrada con el id 'get-city'
let cityInput = document.querySelector("#get-city");

// Agrega un evento para detectar cuando se presiona una tecla en el campo de entrada
cityInput.addEventListener("keypress", (event) => {
  // Si la tecla presionada es "Enter"
  if (event.key == "Enter") {
    // Llama a la función para obtener datos de la API
    fetchDataFromApi();
  }
});

// Define la configuración de la API
let apiData = {
  url: "https://api.openweathermap.org/data/2.5/weather?q=", // URL base para la API del clima
  key: "124b92a8dd9ec01ffb0dbf64bc44af3c", // Clave API para autenticación
};

// Establece un valor inicial en el campo de entrada, llama a la función para obtener datos de la API y luego limpia el campo
cityInput.value = "new york";
fetchDataFromApi();
cityInput.value = "";

// Función para obtener datos de la API
function fetchDataFromApi() {
  // Obtiene el valor ingresado en el campo de entrada
  let insertedCity = cityInput.value;
  // Realiza una solicitud a la API con el nombre de la ciudad y la clave API
  fetch(`${apiData.url}${insertedCity}&&appid=${apiData.key}`)
    .then((res) => res.json()) // Convierte la respuesta en JSON
    .then((data) => addDataToDom(data)); // Llama a la función para agregar los datos al DOM
}

// Selecciona los elementos donde se mostrarán los datos del clima
let cityName = document.querySelector(".city-name");
let cityTemp = document.querySelector(".weather-deg");
let cityCond = document.querySelector(".weather-condition");
let cityHumidity = document.querySelector(".humidity");
let todayDate = document.querySelector(".date");

// Función para agregar datos del clima al DOM
function addDataToDom(data) {
  // Actualiza el nombre de la ciudad y el país
  cityName.innerHTML = `${data.name}, ${data.sys.country}`;
  // Actualiza la temperatura, convirtiendo de Kelvin a Celsius
  cityTemp.innerHTML = `${Math.round(data.main.temp - 273.14)}ºC`;
  // Actualiza la descripción del clima
  cityCond.innerHTML = data.weather[0].description;
  // Actualiza la humedad
  cityHumidity.innerHTML = `humidity: ${data.main.humidity}%`;
  // Actualiza la fecha actual
  todayDate.innerHTML = getDate();
}

// Array con los nombres de los meses
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Función para obtener la fecha actual en formato 'día mes año'
function getDate() {
  let newTime = new Date();
  let month = months[newTime.getMonth()]; // Obtiene el nombre del mes
  return `${newTime.getDate()} ${month} ${newTime.getFullYear()}`; // Retorna la fecha en formato 'día mes año'
}
