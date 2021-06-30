// MIT License

// Copyright (c) [2020] [SourceFuse]

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import {MixinTarget} from '@loopback/core';
import {
  Count,
  DataObject,
  Entity,
  EntityCrudRepository,
  repository,
  Where,
} from '@loopback/repository';
import {keyBy} from 'lodash';

import {Action, AuditLog} from '../models';
import {
  ActualPerformanceTypesRepository,
  AuditLogRepository,
  ExternalReferencesRepository,
  MusicalCharacteristicsRepository,
  MusicalCharacteristicsRhythmTypesRepository,
  RhythmTypesRepository,
  SoundRangesRepository,
  TuneEncodingsRepository,
  TuneMelodiesRepository,
  TunePerformancesRepository,
  TunePlacesRepository,
  TuneSongsRepository,
  TunesPersonsRolesRepository,
  TunesRepository,
  TuneTranscriptionsRepository,
} from '../repositories';
import {
  AuditOptions,
  IAuditController,
  IAuditMixinOptions,
  IEntityWithId,
  UserId,
} from '../types';
import {diff} from 'deep-object-diff';
import {AuditController} from '../controllers';
import { getModelSchemaRef, param, requestBody } from '@loopback/openapi-v3';

export function AuditControllerMixin<
  TEntity extends IEntityWithId,
  T extends MixinTarget<IAuditController<number, TEntity>>
>(superClass: T, opts: IAuditMixinOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  class auditClass extends superClass {
    getCurrentUser?: () => Promise<UserId>;
    getAuditLogRepository: () => Promise<AuditLogRepository>;

    public entityClass = typeof Entity;

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async create(
      dataObject: TEntity,
      options?: AuditOptions,
    ): Promise<TEntity> {
      const created = await super.create(dataObject);
      if (this.getCurrentUser && !options?.noAudit) {
        const user = await this.getCurrentUser();
        const auditRepo = await this.getAuditLogRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const audit = new AuditLog({
          actedAt: new Date(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          actorId: user?.id,
          action: Action.INSERT_ONE,
          after: JSON.stringify(created),
          entityId: created.id,
          actedOn: this.entityClass,
          actionKey: opts.actionKey,
          ...extras,
        });
        auditRepo.create(audit).catch(() => {
          console.error(
            `Audit failed for data => ${JSON.stringify(JSON.stringify(audit))}`,
          );
        });
      }
      return created;
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async updateById(
      @param.path.number('id') 
      id: number,
      @requestBody()
      data: TEntity
    ): Promise<void> {
      const before = await super.findById(id);
      
      await super.updateById(id, data);
      const after = await super.findById(id);
      let diffAfter: any = diff(before, after);
      let diffBefore: any = {};
      Object.entries(diffAfter).forEach(
        ([key, value]) => (diffBefore[key] = (before as any)[key]),
      );
      if (this.getCurrentUser && diffAfter !== diffBefore) {
        const user = await this.getCurrentUser();
        const auditRepo = await this.getAuditLogRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const auditLog = new AuditLog({
          actedAt: new Date(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          actorId: user?.id,
          action: Action.UPDATE_ONE,
          before: diffBefore,
          after: diffAfter,
          entityId: before.id,
          actedOn: this.entityClass,
          actionKey: opts.actionKey,
          ...extras,
        });

        auditRepo.create(auditLog).catch(ex => {
          console.error(ex);
          console.error(
            `Audit failed for data => ${JSON.stringify(
              JSON.stringify(auditLog),
            )}`,
          );
        });
      }
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async deleteById(id: number, options?: AuditOptions): Promise<void> {
      if (options?.noAudit) {
        return super.deleteById(id);
      }
      const before = await super.findById(id);
      await super.deleteById(id);

      if (this.getCurrentUser) {
        const user = await this.getCurrentUser();
        const auditRepo = await this.getAuditLogRepository();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extras: any = Object.assign({}, opts);
        delete extras.actionKey;
        const auditLog = new AuditLog({
          actedAt: new Date(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          actorId: user?.id,
          action: Action.DELETE_ONE,
          before: JSON.stringify(before),
          entityId: before.id,
          actedOn: this.entityClass,
          actionKey: opts.actionKey,
          ...extras,
        });

        auditRepo.create(auditLog).catch(() => {
          console.error(
            `Audit failed for data => ${JSON.stringify(
              JSON.stringify(auditLog),
            )}`,
          );
        });
      }
    }
  }

  return auditClass;
}
