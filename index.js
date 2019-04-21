// get elements from document
const list = document.querySelector('#currency-list');
const input = document.querySelector('#net-worth');
const submit = document.querySelector('#submit')

var rates;

// fetch json with currency conversions
const request = new XMLHttpRequest();
request.addEventListener('load', function(){
  const json = JSON.parse(this.responseText);
  rates = json.rates;
  })

request.open('GET', 'latest.json');
request.overrideMimeType('application/json');
request.send();

const calculateRates = value => {
  // remove any existing list items
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  const ratesArray = [];
  Object.keys(rates).map(rate => ratesArray.push({ currency: rate, value: rates[rate] }));
  console.log(ratesArray);

  const sortedList = ratesArray.sort((a, b) => b.value - a.value);
  sortedList.forEach(rate => {
    const li = document.createElement('li');
    if ((rate.value * value) > 1000000) {
      li.classList.add('millionaire');
    }

    const text = document.createTextNode(`${rate.currency} is the currency, ${(rate.value * value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} is the amount in EUR`);
    li.appendChild(text);
    list.appendChild(li);
  })
}

const onSubmit = () => {
  const value = input.value;
  calculateRates(value);
}

// event listeners
submit.addEventListener('click', onSubmit);

