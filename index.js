// get elements from document
var listWrapper = document.querySelector('#currency-list-wrapper');
var list = document.querySelector('#currency-list');
var input = document.querySelector('#net-worth');
var submit = document.querySelector('#submit');

var data;

// fetch json with currency conversions
var request = new XMLHttpRequest();
request.addEventListener('load', function() {
  var json = JSON.parse(this.responseText);
  data = json;
});

request.open('GET', 'list.json');
request.overrideMimeType('application/json');
request.send();

function calculateRates(value) {
  // remove any existing list items
  listWrapper.removeChild(listWrapper.firstChild);

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // sort the list by how much each currency is worth . . .
  var sortedList = data.sort(function(a, b) {
    return b.rate - a.rate;
  });

  // how many currencies are we a millionaire in?
  var millionaireCurrencies = sortedList.filter(function(country) {
    return country.rate * value >= 1000000;
  }).length;

  // introductory paragraph
  var paragraph = document.createElement('p');
  paragraph.innerHTML =
    "You're a millionaire in <strong>" +
    millionaireCurrencies +
    "</strong> currencies! 💸 If you converted your money, you'd have:";
  listWrapper.insertAdjacentElement('afterbegin', paragraph);

  sortedList.forEach(function(country) {
    var li = document.createElement('li');
    // color it green if you're a millionaire in this currency
    if (country.rate * value >= 1000000) {
      li.classList.add('millionaire');
    }
    // create the text for each country
    li.innerHTML =
      country.emoji +
      ' <strong>' +
      (country.rate * value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
      ' ' +
      country.currencyId +
      '</strong> in ' +
      country.name +
      ' <span class="currency">(' +
      country.currencyName +
      ')</span>';
    list.appendChild(li);
  });
}
function onSubmit() {
  var value = input.value;
  calculateRates(value);
} // event listeners
submit.addEventListener('click', onSubmit);
