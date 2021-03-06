const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function matchCities(userSearch, cities) {
  return cities.filter(location => {
    var regex = new RegExp(userSearch, 'gi');

    return location.city.match(regex) || location.state.match(regex);
  });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayCities() {
  const matchArray = matchCities(this.value, cities);
  const html = matchArray.map(location => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = location.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = location.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(location.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayCities);
searchInput.addEventListener('keyup', displayCities);
