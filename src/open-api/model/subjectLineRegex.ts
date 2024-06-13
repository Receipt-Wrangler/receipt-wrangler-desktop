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


export interface SubjectLineRegex { 
    /**
     * Subject line regex id
     */
    id: number;
    /**
     * Group settings foreign key
     */
    groupSettingsId: number;
    /**
     * Regex to match subject line
     */
    regex: string;
    createdAt?: string;
    createdBy?: number;
    updatedAt?: string;
}

