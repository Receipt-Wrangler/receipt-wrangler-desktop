/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { WidgetType } from './widgetType';


export interface UpsertWidgetCommand { 
    /**
     * Widget name
     */
    name?: string;
    /**
     * Type of widget
     */
    widgetType: WidgetType;
    /**
     * Configuration of widget
     */
    configuration?: { [key: string]: any; };
}
export namespace UpsertWidgetCommand {
}


