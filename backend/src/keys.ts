// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {Users} from './models';
import {Credentials} from '@loopback/authentication-jwt';

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

export namespace TunesFilter {
  export const ALL_NO_CLASSIFIERS = {
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
            {relation: 'tuneMelodies', scope: {}},
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
