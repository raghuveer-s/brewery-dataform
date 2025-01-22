import { createIncrementalConfig, TableType } from '@includes/globalConfig';

describe('BigQuery Config Builder', () => {
  describe('createIncrementalConfig', () => {
    it('should create valid incremental config with all required properties', () => {
      // Arrange
      const params = {
        partitionBy: 'DATE(timestamp_col)',
        partitionExpirationDays: 60
      };

      // Act
      const config = createIncrementalConfig(params);

      // Assert
      expect(config).toMatchObject({
        type: TableType.INCREMENTAL,
        bigquery: {
          partitionBy: params.partitionBy,
          requirePartitionFilter: true,
          partitionExpirationDays: params.partitionExpirationDays
        },
        tags: ['daily']
      });
    });

    it('should throw error if partitionBy is missing', () => {
      // Assert
      expect(() => createIncrementalConfig({ partitionBy: '', partitionExpirationDays: 10 }))
        .toThrow('partitionBy is required for incremental tables');
    });
  });
}); 