const fs = require('fs');

const {rates, date} = require('./latest.json');
const {results: countries} = require('./countries.json');

const newArray = [];

for (const country in countries) {
  // destructure variables from each country
  const {currencyId, currencyName, currencySymbol, name, emoji} = countries[
    country
  ];

  const rate = rates[currencyId];
  const countryObject = {
    name,
    rate,
    currencyId,
    currencyName,
    currencySymbol,
    emoji,
  };
  newArray.push(countryObject);
}

console.log(newArray);
fs.writeFileSync('list.json', JSON.stringify(newArray), {encoding: 'utf8'});
