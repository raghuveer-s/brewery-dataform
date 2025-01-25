'use strict';

var currenciesExchangeRates = require('./currencies-exchange-rates');



Object.defineProperty(exports, "convertCurrency", {
	enumerable: true,
	get: function () { return currenciesExchangeRates.convertCurrency; }
});
