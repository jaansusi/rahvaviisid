// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {Users} from './models';
import {Credentials} from '@loopback/authentication-jwt';
import {RefreshTokenService} from '@loopback/authentication-jwt';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = '!1sV7kAk!q2Y!UxA8!rFq';
  export const TOKEN_EXPIRES_IN_VALUE = '345600';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<
    UserService<Users, Credentials>
  >('services.user.service');
  export const DATASOURCE_NAME = 'jwtdb';
  export const USER_REPOSITORY = 'repositories.UsersRepository';
  export const USER_CREDENTIALS_REPOSITORY =
    'repositories.UserCredentialsRepository';
}

/**
 * Constant values used when generating refresh token.
 */
export namespace RefreshTokenConstants {
  /**
   * The default secret used when generating refresh token.
   */
  export const REFRESH_SECRET_VALUE = '5E22aw*bEQc!^O@7gk5O%';
  /**
   * The default expiration time for refresh token.
   */
  export const REFRESH_EXPIRES_IN_VALUE = '216000';
  /**
   * The default issuer used when generating refresh token.
   */
  export const REFRESH_ISSUER_VALUE = 'loopback4';
}

/**
 * Bindings related to token refresh service. The omitted explanation can be
 * found in namespace `RefreshTokenConstants`.
 */
export namespace RefreshTokenServiceBindings {
  export const REFRESH_TOKEN_SERVICE = BindingKey.create<RefreshTokenService>(
    'services.authentication.jwt.refresh.tokenservice',
  );
  export const REFRESH_SECRET = BindingKey.create<string>(
    'authentication.jwt.refresh.secret',
  );
  export const REFRESH_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.refresh.expires.in.seconds',
  );
  export const REFRESH_ISSUER = BindingKey.create<string>(
    'authentication.jwt.refresh.issuer',
  );
  /**
   * The backend datasource for refresh token's persistency.
   */
  export const DATASOURCE_NAME = 'refreshdb';
  /**
   * Key for the repository that stores the refresh token and its bound user
   * information
   */
  export const REFRESH_REPOSITORY = 'repositories.RefreshTokenRepository';
}

export namespace TunesFilter {
  export const ALL_NO_CLASSIFICATORS = {
    include: [
      // {relation: 'nations'},
      // {relation: 'languages'},
      // {relation: 'countries'},
      {relation: 'externalReferences', scope: {}},
      {
        relation: 'tunesPersonsRoles',
        scope: {
          include: [
            // {relation: 'persons', scope: {}},
            // {relation: 'tunePersonRoleTypes'},
          ],
        },
      },
      {
        relation: 'tunePlaces',
        scope: {
          include: [
            // {relation: 'persons'},
            // {relation: 'tunePlaceTypes'},
            // {relation: 'parishes'},
            // {relation: 'municipalities'},
            // {relation: 'villages'},
          ],
        },
      },
      {
        relation: 'tunePerformances',
        scope: {
          include: [
            // {relation: 'actualPerformanceTypes'},
            // {relation: 'traditionalPerformanceTypes'},
            // {relation: 'actualActionTypes'},
          ],
        },
      },
      {
        relation: 'tuneTranscriptions',
        scope: {
          include: [
            {relation: 'transcriptionSources'},
            {
              relation: 'transcriptionsPersonsRoles',
              scope: {
                include: [
                  // {relation: 'persons'},
                  // {relation: 'transcriptionPersonRoleTypes'},
                ],
              },
            },
          ],
        },
      },
      {relation: 'tuneSongs', scope: {}},
      {
        relation: 'tuneEncodings',
        scope: {
          include: [
            // {relation: 'keySignatures'},
            // {relation: 'supportSounds'},
            // {relation: 'pitches'},
            // {relation: 'measures'},
            // {relation: 'tuneMelodies', scope: {}},
          ],
        },
      },
      {
        relation: 'musicalCharacteristics',
        scope: {
          include: [
            // {relation: 'soundRanges'}
          ],
        },
      },
    ],
  };

  export const ALL = {
    include: [
      {relation: 'nations'},
      {relation: 'languages'},
      {relation: 'countries'},
      {relation: 'externalReferences', scope: {}},
      {
        relation: 'tunesPersonsRoles',
        scope: {
          include: [
            {relation: 'persons', scope: {}},
            {relation: 'tunePersonRoleTypes'},
          ],
        },
      },
      {
        relation: 'tunePlaces',
        scope: {
          include: [
            {relation: 'persons'},
            {relation: 'tunePlaceTypes'},
            {relation: 'parishes'},
            {relation: 'municipalities'},
            {relation: 'villages'},
          ],
        },
      },
      {
        relation: 'tunePerformances',
        scope: {
          include: [
            {relation: 'actualPerformanceTypes'},
            {relation: 'traditionalPerformanceTypes'},
            {relation: 'actualActionTypes'},
          ],
        },
      },
      {
        relation: 'tuneTranscriptions',
        scope: {
          include: [
            {relation: 'transcriptionSources'},
            {
              relation: 'transcriptionsPersonsRoles',
              scope: {
                include: [
                  {relation: 'persons'},
                  {relation: 'transcriptionPersonRoleTypes'},
                ],
              },
            },
          ],
        },
      },
      {relation: 'tuneSongs', scope: {}},
      {
        relation: 'tuneEncodings',
        scope: {
          include: [
            {relation: 'keySignatures'},
            {relation: 'supportSounds'},
            {relation: 'pitches'},
            {relation: 'measures'},
            {relation: 'tuneMelodies', scope: {}},
          ],
        },
      },
      {
        relation: 'musicalCharacteristics',
        scope: {
          include: [
            {relation: 'soundRanges'}
          ],
        },
      },
    ],
  };
}
