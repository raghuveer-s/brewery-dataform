'use strict';

var globalConfig = require('../../includes/globalConfig.js');
var preops = require('../../includes/preops.js');
var currenciesExchangeRates = require('currencies-exchange-rates');

var INRToUSDExchangeRate = currenciesExchangeRates.convertCurrency(100, "INR", "USD");
publish('daily_area_sales', globalConfig.createIncrementalConfig({
    partitionBy: 'DATE(d)',
    partitionExpirationDays: 7
}))
    .query(function (ctx) { return "SELECT\n  Location as location, \n  TIMESTAMP_TRUNC(Brew_Date, DAY) d, \n  SUM(Total_Sales) AS daily_location_sales,\n  SUM(Total_Sales) * ".concat(INRToUSDExchangeRate, " AS daily_location_sales_usd\nFROM\n  ").concat(ctx.ref('brewery_partitioned_clustered'), "\nWHERE\n  TIMESTAMP_TRUNC(Brew_Date, DAY) >= timestamp_checkpoint\nGROUP BY\n  location, d"); })
    .preOps(function (ctx) { return preops.PreOps.createTimestampCheckpoint(ctx, {
    columnName: 'd',
    defaultDate: '2024-01-01'
}); });
