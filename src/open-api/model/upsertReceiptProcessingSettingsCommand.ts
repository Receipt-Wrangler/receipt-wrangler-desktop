/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { OcrEngine } from './ocrEngine';
import { AiType } from './aiType';


export interface UpsertReceiptProcessingSettingsCommand { 
    /**
     * Name of the settings
     */
    name: string;
    /**
     * Description of the settings
     */
    description?: string;
    aiType: AiType;
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
    /**
     * Is vision model
     */
    isVisionModel?: boolean;
    ocrEngine: OcrEngine;
    /**
     * Prompt foreign key
     */
    promptId: number;
}
export namespace UpsertReceiptProcessingSettingsCommand {
}


