/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UserRole } from './userRole';


export interface Claims { 
    /**
     * User foreign key
     */
    userId: number;
    /**
     * User\'s role
     */
    userRole: UserRole;
    /**
     * Display name
     */
    displayName: string;
    /**
     * Default avatar color
     */
    defaultAvatarColor: string;
    /**
     * User\'s username used to login
     */
    username: string;
    /**
     * Issuer
     */
    iss: string;
    /**
     * Subject
     */
    sub?: string;
    /**
     * Audience
     */
    aud?: Array<string>;
    /**
     * Expiration time
     */
    exp: number;
    /**
     * Not before
     */
    nbf?: number;
    /**
     * Issued at
     */
    iat?: number;
    /**
     * JWT ID
     */
    jti?: string;
}
export namespace Claims {
}


