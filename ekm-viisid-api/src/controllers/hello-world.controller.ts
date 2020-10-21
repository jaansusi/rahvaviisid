import {get} from '@loopback/rest';

export class HelloWorldController {
  @get('/hello')
  hello(): string {
    return 'Hello World';
  }
}
