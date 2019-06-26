const fs = require('fs');

const fixerUrl = `https://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&format=1`;

const {rates, date} = require(fixerUrl);
const {results: countries} = require('./countries.json');

const newObject = {};
const usdRate = rates.USD;
newObject.date = date;
newObject.currencies = [];

for (const country in countries) {
  // destructure variables from each country
  const {currencyId, currencyName, currencySymbol, name, emoji} = countries[
    country
  ];

  // convert rates to USD
  const rate = rates[currencyId] / usdRate;
  // make an object for each country
  const countryObject = {
    name,
    rate,
    currencyId,
    currencyName,
    currencySymbol,
    emoji,
  };
  newObject.currencies.push(countryObject);
}

fs.writeFileSync('list.json', JSON.stringify(newObject), {encoding: 'utf8'});
