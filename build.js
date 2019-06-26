const fs = require('fs');
const http = require('http');

// get countries from file
const {results: countries} = require('./countries.json');

// get rates from fixer
http
  .get(
    `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&format=1`,
    response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        const json = JSON.parse(data);

        // get rates
        const rates = json.rates;
        const date = json.date;

        const usdRate = rates.USD;

        const newObject = {};
        newObject.date = date;
        newObject.currencies = [];

        for (const country in countries) {
          // destructure variables from each country
          const {
            currencyId,
            currencyName,
            currencySymbol,
            name,
            emoji,
          } = countries[country];

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

        fs.writeFileSync('list.json', JSON.stringify(newObject), {
          encoding: 'utf8',
        });
      });
    },
  )
  .on('error', error => {
    console.log(`Error: ${error.message}`);
  });
