/**
 * Receipt Wrangler API.
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UserPreferences } from './userPreferences';
import { Group } from './group';
import { Category } from './category';
import { Claims } from './claims';
import { CurrencySeparator } from './currencySeparator';
import { FeatureConfig } from './featureConfig';
import { UserView } from './userView';
import { Icon } from './icon';
import { Tag } from './tag';
import { CurrencySymbolPosition } from './currencySymbolPosition';
import { About } from './about';


export interface AppData { 
    about: About;
    claims: Claims;
    /**
     * Groups in the system
     */
    groups: Array<Group>;
    /**
     * Users in the system
     */
    users: Array<UserView>;
    userPreferences: UserPreferences;
    featureConfig: FeatureConfig;
    /**
     * Categories in the system
     */
    categories: Array<Category>;
    /**
     * Tags in the system
     */
    tags: Array<Tag>;
    /**
     * JWT token
     */
    jwt?: string;
    /**
     * Refresh token
     */
    refreshToken?: string;
    /**
     * Currency display
     */
    currencyDisplay: string;
    currencyThousandthsSeparator?: CurrencySeparator;
    currencyDecimalSeparator?: CurrencySeparator;
    currencySymbolPosition?: CurrencySymbolPosition;
    /**
     * Whether to hide decimal places
     */
    currencyHideDecimalPlaces?: boolean;
    /**
     * Icons in the system
     */
    icons: Array<Icon>;
}
export namespace AppData {
}


