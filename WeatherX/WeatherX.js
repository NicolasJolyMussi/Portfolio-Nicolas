const key = "22a79413abe39bba8f82c1a3fd3510f5"



function dataScreen(data) {
    console.log(data)

    document.querySelector(".city").innerHTML = "Tempo em " + data.name
    document.querySelector(".temp").innerHTML = "Temperatura: " + Math.floor(data.main.temp) + "°C"
    document.querySelector(".text-weather").innerHTML = data.weather[0].description
    document.querySelector(".humidity").innerHTML = "Umidade: " + Math.floor(data.main.humidity) + "%"
    document.querySelector(".img-weather").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
}


async function seachCity(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`).then(response => response.json())


    dataScreen(data)
}

function clickBtn() {
    const city = document.querySelector(".input-city").value

    seachCity(city)
}