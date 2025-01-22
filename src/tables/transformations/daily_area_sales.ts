import config = require('@includes/globalConfig');

publish('daily_area_sales', config)
  .query(
    (ctx) => `SELECT
  Location as location, 
  TIMESTAMP_TRUNC(Brew_Date, DAY) d, 
  SUM(Total_Sales) AS daily_location_sales
FROM
  ${ctx.ref('brewery_partitioned_clustered')}
WHERE
  TIMESTAMP_TRUNC(Brew_Date, DAY) >= timestamp_checkpoint
GROUP BY
  location, d`
  )
  .preOps(
    (ctx) => `
    DECLARE timestamp_checkpoint 
    DEFAULT (${ctx.when(
      ctx.incremental(),
      `SELECT MAX(d) FROM ${ctx.self()} WHERE d IS NOT NULL`,
      `SELECT TIMESTAMP("2023-01-01")`
    )})
    `
  );
