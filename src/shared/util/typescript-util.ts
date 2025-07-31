import { Signal } from '@angular/core';

// discard operator
export const _ = undefined;

export type AsyncVoidFunction = () => Promise<void>;

export type AnyFunction = (...args: any[]) => any;
export type AnyAsyncFunction = (...args: any[]) => Promise<any>;

/** Opposite of `ExcludeType` */
export type FilterByType<Source, Type> = {
    [Key in keyof Source as Source[Key] extends Type ? Key : never]: Source[Key];
};
/** Opposite of `FilterByType` */
export type ExcludeType<Source, Type> = {
  [Key in keyof Source as Source[Key] extends Type ? never : Key]: Source[Key];
};

export type OptionalField<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type OnlyPublic<T> = {[K in keyof T]: T[K]};

export type UnwrapSignal<T> = T extends Signal<infer U> ? U : T

export type Result<ErrorT = object, SuccessT = object> = {
  isSuccess: true
} & SuccessT | {
  isSuccess: false
} & ErrorT;

export type Failure<T extends Result<unknown>> =
  T extends { isSuccess: false } ? T : never;
export type Success<T extends Result<unknown>> =
  T extends { isSuccess: true } ? T : never;

/**
 * Will ignore order. Only works with primitive values.
 * Uses == equality: 1 and "1" will be considered equal.
 */
export function looseCompareArrays<T>(a: T[], b: T[]): boolean {
  return a.sort().toString() === b.sort().toString();
}

export function combineObjects<T extends object>(...objects: T[]): T;
export function combineObjects<Source extends Partial<Target>, Target extends object>(target: Target, ...sources: Source[]): Target;
export function combineObjects(target: object = {}, ...sources: object[]): object {
    return sources.reduce((first, second) => {
        return {...first, ...second};
    }, target);
}

export function capitalize(string: string | undefined) {
  return `${string?.[0].toLocaleUpperCase()}${string?.slice(1)}`;
}

export const isNotNull = <T>(value: T | null): value is T => value !== null;
export const isNotUndefined = <T>(value: T | undefined): value is T => value !== undefined;
export const isDate = (value: any): value is Date => typeof value?.getUTCDate === 'function';
export function assert (condition: boolean, msg?: string): asserts condition {
  if (!condition) throw new Error(msg);
}
