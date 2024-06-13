/**
 * Receipt Wrangler API.
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 5.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface UpsertCommentCommand { 
    /**
     * Comment itself
     */
    comment: string;
    /**
     * Receipt foreign key
     */
    receiptId: number;
    /**
     * User foreign key
     */
    userId?: number;
}

