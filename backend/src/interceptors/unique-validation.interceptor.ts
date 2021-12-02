import {
  /* inject, */
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import { ValidationError } from '../errors';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({tags: {key: UniqueValidationInterceptor.BINDING_KEY}})
export class UniqueValidationInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${UniqueValidationInterceptor.name}`;

  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (ex) {
      // Add error handling logic here
      if (ex.code === '23505') {
        let err: ValidationError = new ValidationError(
          'validation.notUnique',
        );
        err.statusCode = 422;
        throw err;
      }
      throw ex;
    }
  }
}
