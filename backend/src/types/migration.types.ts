export interface MigrationComponentConfig {
  /**
   * Whether to run migrations automatically on startup
   * Default: true
   */
  autoMigrate?: boolean;
  
  /**
   * Whether to fail application startup if migrations fail
   * Default: true
   */
  failOnMigrationError?: boolean;
  
  /**
   * Path to the database migration configuration file
   * Default: './migrations/database.json'
   */
  migrationConfigPath?: string;
  
  /**
   * Migration environment to use
   * Default: 'migrate'
   */
  migrationEnvironment?: string;
}
