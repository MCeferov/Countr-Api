"use strict";
const title = document.getElementById("header-title");
const cardCountainer = document.querySelector(".card-container");
const select = document.getElementById("continent-select");
const searchInput = document.getElementById("searchInput");

let api = [];

const showCards = (data) => {
  cardCountainer.innerHTML = "";
  data.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img id="flag" src="${element.flags.png}" alt="" />
              <div class="card-content">
                <p id="country">${element.name.common}</p>
                <p>Population: <span id="population">${formatNumberWithDots(
                  element.population
                )}</span></p>
                <p>Region: <span id="region">${element.region}</span></p>
                <p>Capital: <span id="capital">${element.capital}</span></p>
              </div>`;
    cardCountainer.append(card);
    darkBtn.addEventListener("click", (e) => {
      card.classList.toggle("card-color");
    });
  });
};

const doFetch = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      api = data;
      showCards(api);
    });
};

doFetch();

const formatNumberWithDots = (number) => {
  const formatter = new Intl.NumberFormat();

  const formattedNumber = formatter.format(number);

  const numberWithDots = formattedNumber.replace(/,/, ".");

  return numberWithDots;
};

let selectedValue;


searchInput.addEventListener("input", (e) => {
  let input = e.target.value.toLowerCase();

  const searchedData = api.filter((data) => {
    return (
      data.name.common.toLowerCase().includes(input) ||
      data.region.toLowerCase().includes(input) ||
      String(data.capital).includes(input.toLowerCase())
      );
    });

  showCards(searchedData);
});


