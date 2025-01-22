enum TableType {
  VIEW = 'view',
  TABLE = 'table',
  INCREMENTAL = 'incremental',
};

const config: ITableConfig = {
  type: TableType.INCREMENTAL,
  bigquery: {
    partitionBy: 'DATE(d)',
    requirePartitionFilter: true,
  },
  tags: ['daily'],
};

export = config;