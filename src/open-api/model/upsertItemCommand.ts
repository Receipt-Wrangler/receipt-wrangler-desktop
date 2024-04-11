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
import { ItemStatus } from './itemStatus';


export interface UpsertItemCommand { 
    /**
     * Amount the item costs
     */
    amount: string;
    /**
     * User foreign key
     */
    chargedToUserId: number;
    /**
     * Item name
     */
    name: string;
    /**
     * Receipt foreign key
     */
    receiptId: number;
    status: ItemStatus;
}
