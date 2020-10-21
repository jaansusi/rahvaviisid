import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Persons} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Persons,
  pattern: 'CrudRest',
  dataSource: 'db',
  basePath: '/persons',
};
module.exports = config;
