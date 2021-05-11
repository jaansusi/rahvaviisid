import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AuditLog} from '../models';
import {AuditLogRepository} from '../repositories';
import { basicAuthorization } from '../services';

@authenticate('jwt')
@authorize({
  allowedRoles: ['admin', 'editor'],
  voters: [basicAuthorization],
})
export class AuditController {
  constructor(
    @repository(AuditLogRepository)
    public auditRepository : AuditLogRepository,
  ) {}

  @get('/audit-logs/count')
  @response(200, {
    description: 'AuditLog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AuditLog) where?: Where<AuditLog>,
  ): Promise<Count> {
    return this.auditRepository.count(where);
  }

  @get('/audit-logs')
  @response(200, {
    description: 'Array of AuditLog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AuditLog, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AuditLog) filter?: Filter<AuditLog>,
  ): Promise<AuditLog[]> {
    return this.auditRepository.find(filter);
  }

  @get('/audit-logs/{id}')
  @response(200, {
    description: 'AuditLog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AuditLog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AuditLog, {exclude: 'where'}) filter?: FilterExcludingWhere<AuditLog>
  ): Promise<AuditLog> {
    return this.auditRepository.findById(id, filter);
  }
}
