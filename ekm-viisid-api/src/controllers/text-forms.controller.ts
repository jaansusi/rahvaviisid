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
} from '@loopback/rest';
import {TextForms} from '../models';
import {TextFormsRepository} from '../repositories';

export class TextFormsController {
  constructor(
    @repository(TextFormsRepository)
    public textFormsRepository : TextFormsRepository,
  ) {}

  @post('/text-forms', {
    responses: {
      '200': {
        description: 'TextForms model instance',
        content: {'application/json': {schema: getModelSchemaRef(TextForms)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TextForms, {
            title: 'NewTextForms',
            exclude: ['id'],
          }),
        },
      },
    })
    textForms: Omit<TextForms, 'id'>,
  ): Promise<TextForms> {
    return this.textFormsRepository.create(textForms);
  }

  @get('/text-forms/count', {
    responses: {
      '200': {
        description: 'TextForms model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TextForms) where?: Where<TextForms>,
  ): Promise<Count> {
    return this.textFormsRepository.count(where);
  }

  @get('/text-forms', {
    responses: {
      '200': {
        description: 'Array of TextForms model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TextForms, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TextForms) filter?: Filter<TextForms>,
  ): Promise<TextForms[]> {
    return this.textFormsRepository.find(filter);
  }

  @patch('/text-forms', {
    responses: {
      '200': {
        description: 'TextForms PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TextForms, {partial: true}),
        },
      },
    })
    textForms: TextForms,
    @param.where(TextForms) where?: Where<TextForms>,
  ): Promise<Count> {
    return this.textFormsRepository.updateAll(textForms, where);
  }

  @get('/text-forms/{id}', {
    responses: {
      '200': {
        description: 'TextForms model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TextForms, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TextForms, {exclude: 'where'}) filter?: FilterExcludingWhere<TextForms>
  ): Promise<TextForms> {
    return this.textFormsRepository.findById(id, filter);
  }

  @patch('/text-forms/{id}', {
    responses: {
      '204': {
        description: 'TextForms PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TextForms, {partial: true}),
        },
      },
    })
    textForms: TextForms,
  ): Promise<void> {
    await this.textFormsRepository.updateById(id, textForms);
  }

  @put('/text-forms/{id}', {
    responses: {
      '204': {
        description: 'TextForms PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() textForms: TextForms,
  ): Promise<void> {
    await this.textFormsRepository.replaceById(id, textForms);
  }

  @del('/text-forms/{id}', {
    responses: {
      '204': {
        description: 'TextForms DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.textFormsRepository.deleteById(id);
  }
}
