import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';


// Set datasource based off environment
const db_host = process.env.DB_HOST || 'localhost';
const db_port = process.env.DB_PORT || 5432;
const db_user = process.env.DB_USERNAME || 'local_dev_username';
const db_pass = process.env.DB_PASSWORD || 'local_dev_password';
const database = process.env.DB_DATABASE || 'kivi';

const config = {
  name: 'db',
  connector: 'postgresql',
  host: db_host,
  port: db_port,
  user: db_user,
  password: db_pass,
  database: database
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
