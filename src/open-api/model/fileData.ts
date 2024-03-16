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
 * File data for images on a receipt
 */
export interface FileData { 
    createdAt?: string;
    createdBy?: number;
    /**
     * MIME file type
     */
    fileType?: string;
    id: number;
    /**
     * Image data
     */
    imageData?: Array<number>;
    /**
     * File name
     */
    name?: string;
    /**
     * Receipt foreign key
     */
    receiptId: number;
    /**
     * File size
     */
    size?: number;
    updatedAt?: string;
}

