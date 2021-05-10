import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import { DbDataSource } from '../datasources';
import {AuditLog} from '../models';

export class AuditLogRepository extends DefaultCrudRepository<
  AuditLog,
  typeof AuditLog.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AuditLog, dataSource);
  }
}