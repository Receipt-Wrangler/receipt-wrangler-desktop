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
import { FilterOperation } from './filterOperation';
import { PagedRequestFieldValue } from './pagedRequestFieldValue';


export interface PagedRequestField { 
    operation: FilterOperation;
    value: PagedRequestFieldValue;
}

