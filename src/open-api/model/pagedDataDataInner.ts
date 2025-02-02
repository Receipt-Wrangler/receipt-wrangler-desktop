/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Comment } from './comment';
import { Group } from './group';
import { GroupMember } from './groupMember';
import { Category } from './category';
import { Receipt } from './receipt';
import { SystemTaskType } from './systemTaskType';
import { Activity } from './activity';
import { ReceiptProcessingSettings } from './receiptProcessingSettings';
import { Item } from './item';
import { GroupReceiptSettings } from './groupReceiptSettings';
import { SystemTaskStatus } from './systemTaskStatus';
import { OcrEngine } from './ocrEngine';
import { SystemTask } from './systemTask';
import { AiType } from './aiType';
import { GroupSettings } from './groupSettings';
import { AssociatedEntityType } from './associatedEntityType';
import { Prompt } from './prompt';
import { SystemEmail } from './systemEmail';
import { TagView } from './tagView';
import { Tag } from './tag';
import { FileData } from './fileData';


export interface PagedDataDataInner { 
    /**
     * Receipt total amount
     */
    amount: string;
    /**
     * Categories associated to receipt
     */
    categories?: Array<Category>;
    /**
     * Comments associated to receipt
     */
    comments?: Array<Comment>;
    createdAt: string;
    createdBy?: number;
    /**
     * Receipt date
     */
    date: string;
    groupId: number;
    id: number;
    /**
     * Files associated to receipt
     */
    imageFiles?: Array<FileData>;
    /**
     * Name of the settings
     */
    name: string;
    /**
     * User paid foreign key
     */
    paidByUserId: number;
    /**
     * Items associated to receipt
     */
    receiptItems?: Array<Item>;
    /**
     * Date resolved
     */
    resolvedDate?: string;
    status: SystemTaskStatus;
    /**
     * Tags associated to receipt
     */
    tags?: Array<Tag>;
    updatedAt?: string;
    /**
     * Created by entity\'s name
     */
    createdByString?: string;
    /**
     * Description of the settings
     */
    description?: string;
    prompt: Prompt;
    groupSettings?: GroupSettings;
    groupReceiptSettings: GroupReceiptSettings;
    /**
     * Members of the group
     */
    groupMembers: Array<GroupMember>;
    /**
     * Is default group (not used yet)
     */
    isDefault?: boolean;
    /**
     * Is all group for user
     */
    isAllGroup: boolean;
    /**
     * Number of receipts associated with this tag
     */
    numberOfReceipts: number;
    type: SystemTaskType;
    startedAt: string;
    endedAt: string;
    associatedEntityId?: number;
    associatedEntityType?: AssociatedEntityType;
    ranByUserId?: number;
    receiptId?: number;
    resultDescription?: string;
    childSystemTasks?: Array<SystemTask>;
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
    /**
     * Is vision model
     */
    isVisionModel?: boolean;
    ocrEngine?: OcrEngine;
    /**
     * Prompt foreign key
     */
    promptId?: number;
    /**
     * IMAP host
     */
    host?: string;
    /**
     * IMAP port
     */
    port?: string;
    /**
     * IMAP username
     */
    username?: string;
    /**
     * IMAP password
     */
    password?: string;
    canBeRestarted?: boolean;
}
export namespace PagedDataDataInner {
}


