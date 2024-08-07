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
import { ReceiptStatus } from './receiptStatus';


export interface UserPreferencesAllOf { 
    /**
     * User preferences id
     */
    id: number;
    /**
     * User foreign key
     */
    userId: number;
    /**
     * Group foreign key
     */
    quickScanDefaultGroupId?: number;
    /**
     * User foreign key
     */
    quickScanDefaultPaidById?: number;
    quickScanDefaultStatus?: ReceiptStatus;
    /**
     * Whether to show large image previews
     */
    showLargeImagePreviews?: boolean;
}

