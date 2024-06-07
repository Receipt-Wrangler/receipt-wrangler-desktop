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


export interface SystemSettings { 
    id: number;
    createdAt: string;
    createdBy?: number;
    /**
     * Created by entity\'s name
     */
    createdByString?: string;
    updatedAt?: string;
    /**
     * Whether local sign up is enabled
     */
    enableLocalSignUp?: boolean;
    /**
     * Debug OCR
     */
    debugOcr?: boolean;
    /**
     * Number of workers to use
     */
    numWorkers?: number;
    /**
     * Email polling interval
     */
    emailPollingInterval?: number;
    /**
     * Receipt processing settings foreign key
     */
    receiptProcessingSettingsId?: number;
    /**
     * Fallback receipt processing settings foreign key
     */
    fallbackReceiptProcessingSettingsId?: number;
}

