import {
  Application,
  Component,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
  config,
} from '@loopback/core';
import {runDbMigrations} from '../migrate';
import {MigrationComponentConfig} from '../types/migration.types';

@lifeCycleObserver('migration')
export class MigrationComponent implements Component, LifeCycleObserver {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private application: Application,
    @config({optional: true})
    private migrationConfig: MigrationComponentConfig = {},
  ) {}

  /**
   * Start the component - runs migrations on application start
   */
  start(): ValueOrPromise<void> {
    const {autoMigrate = true} = this.migrationConfig;
    
    if (autoMigrate) {
      return this.runMigrations();
    }
  }

  /**
   * Stop the component
   */
  stop(): ValueOrPromise<void> {
    // Nothing to do
  }

  private async runMigrations(): Promise<void> {
    const {failOnMigrationError = true} = this.migrationConfig;
    
    try {
      console.log('🔄 Starting automatic database migrations...');
      await runDbMigrations();
      console.log('✅ Database migrations completed successfully');
    } catch (error) {
      console.error('❌ Database migrations failed:', error);
      
      if (failOnMigrationError) {
        throw error;
      } else {
        console.warn('⚠️  Continuing application startup despite migration failures');
      }
    }
  }
}
