import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { EkmUser, EkmUsersWithRelations } from '../models';
import { EkmUserRepository } from '../repositories';
/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export declare type Credentials = {
    email: string;
    password: string;
};
export declare class EkmUserService implements UserService<EkmUser, Credentials> {
    userRepository: EkmUserRepository;
    constructor(userRepository: EkmUserRepository);
    verifyCredentials(credentials: Credentials): Promise<EkmUser>;
    convertToUserProfile(user: EkmUser): UserProfile;
    findUserById(id: string): Promise<EkmUser & EkmUsersWithRelations>;
}
