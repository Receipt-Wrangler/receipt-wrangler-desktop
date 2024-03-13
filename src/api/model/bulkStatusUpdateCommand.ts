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

export interface BulkStatusUpdateCommand { 
    /**
     * Optional comment to leave on each receipt
     */
    comment?: string;
    /**
     * Status to update to
     */
    status: string;
    /**
     * Receipt ids to update
     */
    receiptIds: Array<number>;
}