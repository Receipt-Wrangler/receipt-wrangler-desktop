/**
 * Receipt Wrangler API.
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface UpsertPromptCommand { 
    /**
     * Prompt name
     */
    name: string;
    /**
     * Prompt description
     */
    description?: string;
    /**
     * Prompt text
     */
    prompt: string;
}

