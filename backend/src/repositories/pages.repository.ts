import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pages, PagesRelations} from '../models';

export class PagesRepository extends DefaultCrudRepository<
  Pages,
  typeof Pages.prototype.id,
  PagesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Pages, dataSource);
  }
}
