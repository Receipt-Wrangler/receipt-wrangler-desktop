/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Tag to relate receipts to
 */
export interface TagView { 
    createdAt?: string;
    createdBy?: number;
    id: number;
    /**
     * Name of the tag
     */
    name: string;
    /**
     * Description of the tag
     */
    description?: string;
    updatedAt?: string;
    /**
     * Number of receipts associated with this tag
     */
    numberOfReceipts: number;
}

