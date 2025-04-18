/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { SystemTaskStatus } from './systemTaskStatus';
import { SystemTaskType } from './systemTaskType';


export interface Activity { 
    id: number;
    type: SystemTaskType;
    status: SystemTaskStatus;
    startedAt: string;
    endedAt: string;
    ranByUserId?: number;
    receiptId?: number;
    groupId?: number;
    canBeRestarted?: boolean;
}
export namespace Activity {
}


