/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface UserShortcut { 
    id: number;
    createdAt: string;
    createdBy?: number;
    /**
     * Created by entity\'s name
     */
    createdByString?: string;
    updatedAt?: string;
    /**
     * User preferences id
     */
    userPreferncesId?: number;
    /**
     * Name of the shortcut
     */
    name: string;
    /**
     * Destination of the shortcut
     */
    url?: string;
    /**
     * Icon of shortcut
     */
    icon?: string;
}

