import { FormGroup } from '@angular/forms';
import { PropVal } from '../interfaces/frontend/prop-val.interface';

export class LanguageHelper {
    /** Generic Helpers */
    /**
     * 
     * @param entity 
     * @returns 
     */
    static isDefined(entity: any): boolean {
        return entity !== undefined && entity !== null;
    }

    /**
     * 
     * @param entity 
     * @returns 
     */
    static isNotDefined(entity: any): boolean {
        return !this.isDefined(entity);
    }

    static isConstructorName(entity: any, constructorName: string): boolean {
        return this.isDefined(entity) &&
            entity.constructor.toString().indexOf(constructorName) > -1;
    }
    static stringify(entity: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        return JSON.stringify(entity, replacer, space);
    }
    static parse(entity: any, reviver?: (key: any, value: any) => any) {
        return JSON.parse(entity, reviver);
    }
    static JSONDeepClone(entity: any) {
        return this.parse(this.stringify(entity));
    }
    static deepClone(obj: any) {
        if (obj == null || typeof (obj) !== 'object' || obj instanceof FormGroup) {
            return obj;
        }

        const temp = new obj.constructor();

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = this.deepClone(obj[key]);
            }
        }

        return temp;
    }
    static objectAssign(entities: any[], targetEntity = {}): any {
        return Object.assign(targetEntity, ...entities);
    }

    static isPropDefined(obj: PropVal, dotSeperatedProps: string): boolean {
        return this.reduceProps(
            obj,
            dotSeperatedProps,
            (prev: any, currProp: any) => {
                this.isPropPartOfThisObj(prev, currProp);
            }
        );
    }
    static isObjAndPropDefined(obj: PropVal, prop: string) {
        const isObjDefined = this.isDefined(obj) && this.isObj(obj);
        const isPropDefined = this.isDefinedAndNotEmptyOrWhiteSpace(prop);
        return isObjDefined && isPropDefined;
    }
    static getPropValueIfObjIsDefined(obj: any, prop: any) {
        return this.isObjAndPropDefined(obj, prop) ? obj[prop] : undefined;
    }
    static isObj(entity: any): boolean {
        return this.isConstructorName(entity, 'Object') || (!this.isArray(entity) && typeof entity === 'object');
    }
    static createNewObject(): {} {
        return {};
    }
    static getObjProps(obj: PropVal) {
        const isObjDefined = this.isDefined(obj);
        if (isObjDefined) {
            return Object.keys(obj);
        }
        return [];
    }

    static isPropPartOfThisObj(obj: PropVal, prop: string): boolean {
        return this.isObjAndPropDefined(obj, prop) ? prop in obj : false;
    }
    static getPropValue<T = any>(obj: PropVal, dotSeperatedProps: string): T {
        return this.reduceProps(
            obj,
            dotSeperatedProps,
            (cumulativeObject: any, currProp: any) => this.isPropPartOfThisObj(cumulativeObject, currProp) ? cumulativeObject[currProp] : undefined
        );
    }

    static reduceProps(obj: PropVal, dotSeperatedProps: string, condition: any, initialValue?: any): any {
        let value;
        if (
            this.isObjAndPropDefined(obj, dotSeperatedProps) &&
            this.isDefined(condition)
        ) {
            const props = dotSeperatedProps.split('.');
            value = props.reduce(
                (prev, currProp) => condition(prev, currProp),
                this.isDefined(initialValue) ? initialValue : obj
            );
        }
        return value;
    }

    /** Array Helpers */
    static isArray(entity: any): boolean {
        return this.isConstructorName(entity, 'Array');
    }

    static arrayCount(array: any[]) {
        return this.isArray(array) ? array.length : undefined;
    }

    static getLastElement<T>(array: T[]){
        return this.isArray(array) ? array[<number>this.arrayCount(array) - 1] : null;
    }

    /** String Helpers */
    static isString(entity: any): boolean {
        return this.isConstructorName(entity, 'String');
    }

    static isEmptyString(entity: any): boolean {
        return entity === '';
    }
    static isWhiteSpace(entity: any): boolean {
        return LanguageHelper.isString(entity) && entity.length > 0 && entity.trim().length === 0;
    }

    static isDefinedAndNotEmptyOrWhiteSpace(entity: any): boolean {
        return this.isDefined(entity) && !LanguageHelper.isEmptyString(entity) && !LanguageHelper.isWhiteSpace(entity);
    }

    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    static isObject(item: any) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    static getValueFromCombinedProp(obj: any, prop: string): string {
        let val = '';
        if (prop.includes('+')) {
            const props = prop.split('+');
            props.forEach(p => {
                val = `${val} ${this.getPropValue(obj, p)}`
            });
        }
        return val;
    }

    static splitOnFirstOccurence(text: string, char: string): string[] {
        return [text.split(char)[0], text.split(char).slice(1).join(char)]
    }

    static generateListFromTo(from: number, to: number) : number[] | undefined{
        if (to > from) {
            return Array.from({ length: to - from + 1 }, (v, k) => k + from);
        }
        else return undefined;
    }

}
