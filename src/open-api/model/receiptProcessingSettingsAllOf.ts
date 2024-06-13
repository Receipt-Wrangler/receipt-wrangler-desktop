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
import { OcrEngine } from './ocrEngine';
import { AiType } from './aiType';
import { Prompt } from './prompt';


export interface ReceiptProcessingSettingsAllOf { 
    /**
     * Name of the settings
     */
    name?: string;
    /**
     * Description of the settings
     */
    description?: string;
    aiType?: AiType;
    /**
     * URL for custom endpoints
     */
    url?: string;
    /**
     * Key for endpoints that require authentication
     */
    key?: string;
    /**
     * LLM model
     */
    model?: string;
    ocrEngine?: OcrEngine;
    prompt?: Prompt;
    /**
     * Prompt foreign key
     */
    promptId?: number;
}

