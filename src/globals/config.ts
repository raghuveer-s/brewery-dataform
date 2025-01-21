const config: ITableConfig = {
  type: TableType.INCREMENTAL,
  bigquery: {
    partitionBy: 'DATE(d)',
    requirePartitionFilter: true,
  },
  tags: ['daily'],
}

declare config;