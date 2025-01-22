var TableType;
(function (TableType) {
    TableType["VIEW"] = "view";
    TableType["TABLE"] = "table";
    TableType["INCREMENTAL"] = "incremental";
})(TableType || (TableType = {}));
var config = {
    type: TableType.INCREMENTAL,
    bigquery: {
        partitionBy: 'DATE(d)',
        requirePartitionFilter: true,
    },
    tags: ['daily'],
};
module.exports = config;
