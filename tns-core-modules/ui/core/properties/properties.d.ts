/**
 * @module "ui/core/properties"
 */ /** */

import { ViewBase } from "../view-base";
import { Style } from "../../styling/style";

export { Style };

/**
 * Value specifing that Property should be set to its initial value.
 */
export const unsetValue: any;

export interface PropertyOptions<T, U> {
    readonly name: string;
    readonly defaultValue?: U;
    readonly affectsLayout?: boolean;
    readonly equalityComparer?: (x: U, y: U) => boolean;
    readonly valueChanged?: (target: T, oldValue: U, newValue: U) => void;
    readonly valueConverter?: (value: string) => U;
}

export interface CoerciblePropertyOptions<T, U> extends PropertyOptions<T, U> {
    readonly coerceValue: (t: T, u: U) => U;
}

export interface CssPropertyOptions<T extends Style, U> extends PropertyOptions<T, U> {
    readonly cssName: string;
}

export interface ShorthandPropertyOptions<P> {
    readonly name: string,
    readonly cssName: string;
    readonly converter: (value: string | P) => [CssProperty<any, any> | CssAnimationProperty<any, any>, any][],
    readonly getter: (this: Style) => string | P
}

export interface CssAnimationPropertyOptions<T, U> {
    readonly name: string;
    readonly cssName?: string;
    readonly defaultValue?: U;
    readonly equalityComparer?: (x: U, y: U) => boolean;
    readonly valueChanged?: (target: T, oldValue: U, newValue: U) => void;
    readonly valueConverter?: (value: string) => U;
}

export class Property<T extends ViewBase, U> {
    constructor(options: PropertyOptions<T, U>);

    public readonly getDefault: symbol;
    public readonly setNative: symbol;
    public readonly defaultValue: U;
    public register(cls: { prototype: T }): void;
    public nativeValueChange( owner: T, value: U ): void;
    public isSet(instance: T): boolean;
}
export interface Property<T extends ViewBase, U> extends TypedPropertyDescriptor<U> {
}

export class CoercibleProperty<T extends ViewBase, U> extends Property<T, U> {
    constructor(options: CoerciblePropertyOptions<T, U>);

    public readonly coerce: (target: T) => void;
}
export interface CoercibleProperty<T extends ViewBase, U> extends TypedPropertyDescriptor<U> {
}

export class InheritedProperty<T extends ViewBase, U> extends Property<T, U> {
    constructor(options: PropertyOptions<T, U>);
}

export class CssProperty<T extends Style, U> {
    constructor(options: CssPropertyOptions<T, U>);

    public readonly getDefault: symbol;
    public readonly setNative: symbol;
    public readonly name: string;
    public readonly cssName: string;
    public readonly cssLocalName: string;
    public readonly defaultValue: U;
    public register(cls: { prototype: T }): void;
    public isSet(instance: T): boolean;
}

export class InheritedCssProperty<T extends Style, U> extends CssProperty<T, U> {
    constructor(options: CssPropertyOptions<T, U>);
}

export class ShorthandProperty<T extends Style, P> {
    constructor(options: ShorthandPropertyOptions<P>);

    public readonly name: string;
    public readonly cssName: string;

    public register(cls: typeof Style): void;
}

export class CssAnimationProperty<T extends Style, U> {
    constructor(options: CssAnimationPropertyOptions<T, U>);

    public readonly getDefault: symbol;
    public readonly setNative: symbol;

    public readonly name: string;
    public readonly cssName: string;
    public readonly cssLocalName: string;

    readonly keyframe: string;

    public readonly defaultValue: U;

    public register(cls: { prototype: T }): void;
    public isSet(instance: T): boolean;

    /**
     * @private
     */
    public _initDefaultNativeValue(target: T): void;
    /**
     * @private
     */
    public _valueConverter?: (value: string) => any;
    /**
     * @private
     */
    public static _getByCssName(name: string): CssAnimationProperty<any, any>;
    /**
     * @private
     */
    public static _getPropertyNames(): string[];
}

export function initNativeView(view: ViewBase): void;
export function resetNativeView(view: ViewBase): void;
export function resetCSSProperties(style: Style): void;
export function propagateInheritableProperties(view: ViewBase, childView: ViewBase): void;
export function propagateInheritableCssProperties(parentStyle: Style, childStyle: Style): void;
export function clearInheritedProperties(view: ViewBase): void;

export function makeValidator<T>(...values: T[]): (value: any) => value is T;
export function makeParser<T>(isValid: (value: any) => boolean): (value: any) => T;

export function getSetProperties(view: ViewBase): [string, any][];
export function getComputedCssValues(view: ViewBase): [string, any][];

//@private
/**
 * @private get all properties defined on ViewBase
 */
export function _getProperties(): Property<any, any>[];

/**
 * @private get all properties defined on Style
 */
export function _getStyleProperties(): CssProperty<any, any>[];
//@endprivate
