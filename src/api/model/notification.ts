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
import { NotificationType } from './notificationType';

/**
 * Notification
 */
export interface Notification { 
    /**
     * Notification body  requried: true
     */
    body: string;
    createdAt?: string;
    createdBy?: number;
    id: number;
    /**
     * Title
     */
    title: string;
    type: NotificationType;
    updatedAt?: string;
    /**
     * User foreign key
     */
    userId: number;
}