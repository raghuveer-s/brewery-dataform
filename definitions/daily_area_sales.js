Object.defineProperty(exports, "__esModule", { value: true });
var config = require("./includes/globalConfig");
publish('daily_area_sales', config)
    .query(function (ctx) { return "SELECT\n  Location as location, \n  TIMESTAMP_TRUNC(Brew_Date, DAY) d, \n  SUM(Total_Sales) AS daily_location_sales\nFROM\n  ".concat(ctx.ref('brewery_partitioned_clustered'), "\nWHERE\n  TIMESTAMP_TRUNC(Brew_Date, DAY) >= timestamp_checkpoint\nGROUP BY\n  location, d"); })
    .preOps(function (ctx) { return "\n    DECLARE timestamp_checkpoint \n    DEFAULT (".concat(ctx.when(ctx.incremental(), "SELECT MAX(d) FROM ".concat(ctx.self()), "SELECT TIMESTAMP(\"2023-01-01\")"), ")\n    "); });
