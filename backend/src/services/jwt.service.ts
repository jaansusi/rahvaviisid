// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/context';
import { repository } from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import { UsersRepository } from '../repositories';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,    
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) {}

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized('authentication.invalidCredentials');
    }

    let userProfile: UserProfile;

    try {
      // decode user profile from token
      const decodedToken = await verifyAsync(token, this.jwtSecret);
      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      userProfile = Object.assign(
        {[securityId]: '', name: ''},
        {
          [securityId]: decodedToken.id,
          name: decodedToken.name,
          id: decodedToken.id,
          roles: decodedToken.roles,
        },
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized('authentication.invalidCredentials');
    }

    const user = await this.usersRepository.findById(userProfile[securityId]);
    if (!user.isActive)
      throw new HttpErrors.Unauthorized('authentication.userInactive');

    return userProfile;
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized('authentication.invalidCredentials');
    }
    const userInfoForToken = {
      id: userProfile[securityId],
      name: userProfile.name,
      roles: userProfile.roles,
    };
    // Generate a JSON Web Token
    let token: string;
    try {
      token = await signAsync(userInfoForToken, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized('authentication.invalidCredentials');
    }

    return token;
  }
}
