/**
 * Receipt Wrangler API.
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { GroupMember } from './groupMember';
import { GroupSettings } from './groupSettings';
import { GroupStatus } from './groupStatus';

/**
 * Group in the system
 */
export interface Group { 
    createdAt?: string;
    createdBy?: number;
    groupSettings?: GroupSettings;
    /**
     * Members of the group
     */
    groupMembers: Array<GroupMember>;
    id: number;
    /**
     * Is default group (not used yet)
     */
    isDefault?: boolean;
    /**
     * Name of the group
     */
    name: string;
    /**
     * Is all group for user
     */
    isAllGroup: boolean;
    status: GroupStatus;
    updatedAt?: string;
}