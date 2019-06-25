// get elements from document
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

var calculateRates = value => {
  // remove any existing list items
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  var sortedList = data.sort((a, b) => b.rate - a.rate);
  sortedList.forEach(country => {
    var li = document.createElement('li');
    if (country.rate * value >= 1000000) {
      li.classList.add('millionaire');
    }

    var text = document.createTextNode(
      `${country.emoji} ${country.currencyId} is the currency, ${(
        country.rate * value
      )
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')} is the amount in EUR`,
    );
    li.appendChild(text);
    list.appendChild(li);
  });
};

var onSubmit = () => {
  var value = input.value;
  calculateRates(value);
};

// event listeners
submit.addEventListener('click', onSubmit);
