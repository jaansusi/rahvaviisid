import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
  oas,
  RestBindings,
} from '@loopback/rest';
import {TuneMelodies} from '../models';
import {TuneMelodiesRepository} from '../repositories';
import {PythonShell} from 'python-shell';
import tmp from 'tmp';
import fs from 'fs';
import { inject } from '@loopback/context';

import { UniqueValidationInterceptor } from '../interceptors';
import { intercept } from '@loopback/core';

@intercept(UniqueValidationInterceptor.BINDING_KEY)
export class ConvertController {
  constructor(
    @repository(TuneMelodiesRepository)
    public tuneMelodiesRepository: TuneMelodiesRepository
  ) {}

  @get('/convert/{id}')
  async findById(
    @param.path.number('id') id: number,
    ): Promise<string> {
    let responseContent = '';
    let tuneMelody = await this.tuneMelodiesRepository.findById(id);
    let melodyLines = tuneMelody.melody.split('\n');
    let wordsLines = tuneMelody.words ? tuneMelody.words.split('\n') : [];
    let melodyAndWords = melodyLines.map((melodyLine, i) => {
      return (
        melodyLine +
        (wordsLines[i] === undefined || wordsLines[i] === ''
          ? ''
          : '\nw: ' + wordsLines[i])
      );
    });
    let combinedData = [
      tuneMelody.reference === null ? '' : 'X: ' + tuneMelody.reference,
      tuneMelody.customInput === null ? '' : tuneMelody.customInput,
      tuneMelody.alter === null ? '' : 'K: ' + tuneMelody.alter,
      tuneMelody.tempo === null ? '' : 'Q: ' + tuneMelody.tempo,
      tuneMelody.noteLength === null ? '' : 'L: ' + tuneMelody.noteLength,
    ]
      .concat(melodyAndWords)
      .filter(elem => elem !== '')
      .join('\n');
    let tempFile = tmp.fileSync();
    return new Promise((resolve, reject) => {
      fs.writeFile(tempFile.name, combinedData, 'utf8', err => {
        let options = {
          pythonOptions: ['-b'],
          args: [tempFile.name],
        };
        let shell = new PythonShell('executables/abc2xml.py', options);
        shell.on('message', e => {
          responseContent += e + '\n';
        });
        shell.end(err => {
          fs.readFileSync(tempFile.name);
          console.log(err);
  
          tempFile.removeCallback();
          resolve(responseContent);
        });
      });
    });
  }

  @post('/convert', {
    responses: {
      '200': {
        description: 'Tunes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TuneMelodies),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {fileContents: 'string'},
        },
      },
    })
    tunes: object,
  ): Promise<object> {
    return tunes;
  }
}
