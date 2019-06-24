const fs = require('fs');

const {rates, date} = require('./latest.json');
const {results: countries} = require('./countries.json');

const newArray = [];

for (const country in countries) {
  // destructure variables from each country
  const {currencyId, currencyName, currencySymbol, name} = countries[country];

  const rate = rates[currencyId];
  const countryObject = {
    name,
    rate,
    currencyId,
    currencyName,
    currencySymbol,
  };
  newArray.push(countryObject);
  console.log(countryObject);
}

// console.log(countries);
