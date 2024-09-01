import { validateIp, getAddress, addOffset } from "./helpers";
import ymaps from "ymaps";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

const mapArea = document.querySelector(".map");

let map;
let marker;

ymaps
  .load()
  .then((maps) => {
    map = new maps.Map(mapArea, {
      center: [51.505, -0.09],
      zoom: 10,
      controls: [],
    });

    // Создание маркера
    marker = new maps.Placemark([51.505, -0.09]);

    // Добавление маркера на карту
    map.geoObjects.add(marker);
  })
  .catch((error) => console.log("Failed to load Yandex Maps", error));

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + " " + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  if (map && marker) {
    map.setCenter([lat, lng], 10);
    marker.geometry.setCoordinates([lat, lng]);

    // Обновляем данные маркера
    marker.properties.set({
      hintContent: `${country}, ${region}`,
      balloonContent: `IP: ${mapData.ip}<br>ISP: ${mapData.isp}`,
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAddress("102.22.22.1").then(setInfo);
});
