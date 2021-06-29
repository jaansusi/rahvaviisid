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

// THE SOFTWARE IS PROVTEntityIdED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
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

export function AuditControllerMixin<
  TEntityId,
  TEntity extends IEntityWithId,
  T extends MixinTarget<IAuditController<TEntityId, TEntity>>
>(superClass: T, opts: IAuditMixinOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  class auditClass extends superClass {
    constructor() {
      super();
    }

    public entityClass = typeof Entity;

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async create(
      dataObject: TEntity,
      options?: AuditOptions,
    ): Promise<TEntity> {
      const created = await this.create(dataObject);
      if (this.getCurrentUser && !options?.noAudit) {
        const user = await this.getCurrentUser();
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
        super.auditLogRepository.create(audit).catch(() => {
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
      id: TEntityId,
      data: TEntity,
      options?: AuditOptions,
    ): Promise<void> {
      if (options?.noAudit) {
        return super.updateById(id, data);
      }
      const before = await this.findById(id);
      // loopback repository internally calls updateAll so we don't want to create another log
      if (options) {
        options.noAudit = true;
      } else {
        options = {noAudit: true};
      }
      await super.updateById(id, data);
      const after = await this.findById(id);
      let diffAfter: any = diff(before, after);
      let diffBefore: any = {};
      Object.entries(diffAfter).forEach(
        ([key, value]) => (diffBefore[key] = (before as any)[key]),
      );
      if (this.getCurrentUser && diffAfter !== diffBefore) {
        const user = await this.getCurrentUser();
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

        super.auditLogRepository.create(auditLog).catch(ex => {
          console.error(ex);
          console.error(
            `Audit failed for data => ${JSON.stringify(JSON.stringify(auditLog))}`,
          );
        });
      }
    }

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    async deleteById(id: TEntityId, options?: AuditOptions): Promise<void> {
      if (options?.noAudit) {
        return super.deleteById(id);
      }
      const before = await this.findById(id);
      await super.deleteById(id);

      if (this.getCurrentUser) {
        const user = await this.getCurrentUser();
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

        super.auditLogRepository.create(auditLog).catch(() => {
          console.error(
            `Audit failed for data => ${JSON.stringify(JSON.stringify(auditLog))}`,
          );
        });
      }
    }
    
  }

  return auditClass;
}
