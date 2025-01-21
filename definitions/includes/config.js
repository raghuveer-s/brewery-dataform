const config = {
    type: TableType.INCREMENTAL,
    bigquery: {
        partitionBy: 'DATE(d)',
        requirePartitionFilter: true,
    },
    tags: ['daily'],
};

export { config };
