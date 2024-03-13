/**
 * Receipt Wrangler API.
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ItemStatus } from './itemStatus';

/**
 * Itemized item on a receipt
 */
export interface Item { 
    /**
     * Is taxed (not used)
     */
    isTaxed?: boolean;
    /**
     * Amount the item costs
     */
    amount: string;
    /**
     * User foreign key
     */
    chargedToUserId: number;
    createdAt?: string;
    createdBy?: number;
    id?: number;
    /**
     * Item name
     */
    name: string;
    /**
     * Receipt foreign key
     */
    receiptId: number;
    status: ItemStatus;
    updatedAt?: string;
}