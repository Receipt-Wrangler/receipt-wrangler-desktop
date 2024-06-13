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


/**
 * Status of a receipt
 */
export type ReceiptStatus = 'OPEN' | 'NEEDS_ATTENTION' | 'RESOLVED' | 'DRAFT';

export const ReceiptStatus = {
    Open: 'OPEN' as ReceiptStatus,
    NeedsAttention: 'NEEDS_ATTENTION' as ReceiptStatus,
    Resolved: 'RESOLVED' as ReceiptStatus,
    Draft: 'DRAFT' as ReceiptStatus
};

