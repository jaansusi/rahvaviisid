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
    let diffAfter: any = diff(before, after);
    console.log(JSON.stringify(diffAfter));
    let diffBefore: any = {};
    Object.entries(diffAfter).forEach(
      ([key, value]) => (diffBefore[key] = (before as any)[key]),
    );
    // console.log(diffBefore);
    // console.log(diffAfter);
    if (this.getCurrentUser && diffAfter !== diffBefore) {
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
        before: diffBefore,
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
}
