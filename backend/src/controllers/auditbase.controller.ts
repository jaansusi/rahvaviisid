import {Entity} from '@loopback/repository';
import {diff} from 'deep-object-diff';
import {Action, AuditLog} from '../models';
import {AuditLogRepository} from '../repositories';
import {IAuditMixinOptions, IEntityWithId, UserId} from '../types';

export abstract class AuditBaseController<TEntity extends IEntityWithId> {
  constructor(private opts: IAuditMixinOptions) {}
  getCurrentUser?: () => Promise<UserId>;
  getAuditLogRepository: () => Promise<AuditLogRepository>;

  public entityClass = typeof Entity;

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  async auditCreate(created: TEntity): Promise<TEntity> {
    if (this.getCurrentUser) {
      const user = await this.getCurrentUser();
      const auditRepo = await this.getAuditLogRepository();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extras: any = Object.assign({}, this.opts);
      delete extras.actionKey;
      const audit = new AuditLog({
        actedAt: new Date(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        actorId: user?.id,
        action: Action.INSERT_ONE,
        after: JSON.stringify(created),
        entityId: created.id,
        actedOn: this.entityClass,
        actionKey: this.opts.actionKey,
        ...extras,
      });
      auditRepo.create(audit).catch(ex => {
        console.error(ex);
        console.error(
          `Audit failed for data => ${JSON.stringify(JSON.stringify(audit))}`,
        );
      });
    }
    return created;
  }

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  async auditUpdate(before: TEntity, after: TEntity): Promise<void> {
    let diffAfter: any = this.diff(before, after);
    if (this.getCurrentUser) {
      const user = await this.getCurrentUser();
      const auditRepo = await this.getAuditLogRepository();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extras: any = Object.assign({}, this.opts);
      delete extras.actionKey;
      const auditLog = new AuditLog({
        actedAt: new Date(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        actorId: user?.id,
        action: Action.UPDATE_ONE,
        after: diffAfter,
        entityId: before.id,
        actedOn: this.entityClass,
        actionKey: this.opts.actionKey,
        ...extras,
      });

      auditRepo.create(auditLog).catch(ex => {
        console.error(ex);
        console.error(`Audit failed for data => ${JSON.stringify(auditLog)}`);
        throw ex;
      });
    }
  }

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  async auditDelete(deleted: TEntity): Promise<void> {
    if (this.getCurrentUser) {
      const user = await this.getCurrentUser();
      const auditRepo = await this.getAuditLogRepository();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extras: any = Object.assign({}, this.opts);
      delete extras.actionKey;
      const auditLog = new AuditLog({
        actedAt: new Date(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        actorId: user?.id,
        action: Action.DELETE_ONE,
        before: JSON.stringify(deleted),
        entityId: deleted.id,
        actedOn: this.entityClass,
        actionKey: this.opts.actionKey,
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
  private diff(base: TEntity, object: TEntity) {
    const changes: any = {};
  
    function walkObject(base: any, object: any, path = '') {
      for (const key of Object.keys(base)) {
        if (key === 'modified')
          continue;
        const currentPath = path === ''
          ? key
          : `${path}.${key}`;
  
        if (object[key] === undefined) {
          changes[currentPath] = '-';
        }
      }
  
      for (const [key, value] of Object.entries(object)) {
        const currentPath = Array.isArray(object)
          ? path + `[${key}]`
          : path === ''
            ? key
            : `${path}.${key}`;
  
        if (base[key] === undefined) {
          changes[currentPath] = '+';
        }
        else if (value !== base[key]) {
          if (typeof value === 'object' && typeof base[key] === 'object') {
            walkObject(base[key], value, currentPath)
          }
          else {
            changes[currentPath] = object[key];
          }
        }
      }
    }
  
    walkObject(base, object);
  
    return changes
  }
}
