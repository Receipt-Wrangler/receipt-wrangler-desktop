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


/**
 * Notification
 */
export interface Notification { 
    /**
     * Notification body  requried: true
     */
    body: string;
    createdAt?: string;
    createdBy?: number;
    id: number;
    /**
     * Title
     */
    title: string;
    type: string;
    updatedAt?: string;
    /**
     * User foreign key
     */
    userId: number;
}
