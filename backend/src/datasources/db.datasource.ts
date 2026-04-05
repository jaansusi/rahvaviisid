import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';


// Set datasource based off environment
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USERNAME;
const db_pass = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const config = {
  name: 'db',
  connector: 'postgresql',
  host: db_host,
  port: db_port,
  user: db_user,
  password: db_pass,
  database: database,
  schema: 'folk_tune'
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
