import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
import { CrudRestComponent } from '@loopback/rest-crud';
import { AuthenticationComponent } from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  SECURITY_SCHEME_SPEC,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {DbDataSource} from './datasources';
import { AuthorizationBindings, AuthorizationComponent, AuthorizationDecision, AuthorizationOptions } from '@loopback/authorization';
import { UserManagementService } from './services/user-management.service';
import { JWTService } from './services/jwt.service';
import { TokenServiceBindings } from './keys';
import { MigrationComponent } from './components/migration.component';
import rateLimit from 'express-rate-limit';

export { ApplicationConfig };

export class EkmViisidApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);


    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.component(CrudRestComponent);

    this.component(AuthenticationComponent);

    this.component(JWTAuthenticationComponent);

    this.component(AuthorizationComponent);

    // Add migration component for automatic database migrations
    this.component(MigrationComponent);

    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);

    // Rate limit login endpoint to prevent brute-force attacks
    const loginLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_LOGIN_MAX || '20', 10),
      standardHeaders: true,
      legacyHeaders: false,
      message: {error: {message: 'Too many requests, please try again later.'}},
    });
    this.middleware(
      async (ctx, next) => {
        const req = ctx.request;
        if (req.path === '/users/login' && req.method === 'POST') {
          await new Promise<void>((resolve, reject) => {
            loginLimiter(req as any, ctx.response as any, (err?: any) => {
              if (err) reject(err);
              else resolve();
            });
          });
          if (ctx.response.headersSent) return;
        }
        return next();
      },
    );

    this.setUpBindings();
  }

  setUpBindings(): void {
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(process.env.JWT_SECRET);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(UserManagementService);
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to("345600");
  }
}
