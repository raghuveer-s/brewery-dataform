//import { TableType } from "./enums";

const TableType = {
    "VIEW": "view",
    "INCREMENTAL": "incremental"
};

const config = {
    type: "incremental",
    bigquery: {
        partitionBy: 'DATE(d)',
        requirePartitionFilter: true,
    },
    tags: ['daily'],
};

module.exports = { config, TableType };