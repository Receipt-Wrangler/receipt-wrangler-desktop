/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface CustomFieldValue { 
    id: number;
    createdAt: string;
    createdBy?: number;
    /**
     * Created by entity\'s name
     */
    createdByString?: string;
    updatedAt?: string;
    /**
     * Receipt Id
     */
    receiptId: number;
    /**
     * Custom Field ID
     */
    customFieldId: number;
    /**
     * Custom Field String Value
     */
    stringValue?: string;
    /**
     * Custom Field Date Value
     */
    dateValue?: string;
    /**
     * Custom Field Select Value
     */
    selectValue?: number;
    /**
     * Custom Field Currency Value
     */
    currencyValue?: string;
    /**
     * Custom Field Boolean Value
     */
    booleanValue?: boolean;
}

