/**
 * Receipt Wrangler API.
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Widget } from './widget';


/**
 * Dashboard for a user
 */
export interface Dashboard { 
    createdAt?: string;
    createdBy?: number;
    id: number;
    /**
     * Dashboard name
     */
    name: string;
    /**
     * Group foreign key
     */
    groupId?: number;
    /**
     * User foreign key
     */
    userId: number;
    updatedAt?: string;
    /**
     * Widgets associated to dashboard
     */
    widgets?: Array<Widget>;
}
