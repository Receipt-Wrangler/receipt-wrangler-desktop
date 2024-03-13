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

export interface PageRequestCommand { 
    /**
     * Page number
     */
    page: number;
    /**
     * Number of records per page
     */
    pageSize: number;
    /**
     * field to order on
     */
    orderBy?: string;
    sortDirection?: PageRequestCommand.SortDirectionEnum;
}
export namespace PageRequestCommand {
    export type SortDirectionEnum = 'asc' | 'desc' | '';
    export const SortDirectionEnum = {
        Asc: 'asc' as SortDirectionEnum,
        Desc: 'desc' as SortDirectionEnum,
        Empty: '' as SortDirectionEnum
    };
}