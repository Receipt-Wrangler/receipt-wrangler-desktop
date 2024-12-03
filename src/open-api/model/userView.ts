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


/**
 * User in the system
 */
export interface UserView { 
    /**
     * User\'s username used to login
     */
    username: string;
    createdAt?: string;
    createdBy?: number;
    /**
     * Default avatar color
     */
    defaultAvatarColor?: string;
    /**
     * Display name
     */
    displayName: string;
    id: number;
    /**
     * Is dummy user
     */
    isDummyUser: boolean;
    updatedAt?: string;
    /**
     * User\'s role
     */
    userRole: UserRole;
}
export namespace UserView {
}


