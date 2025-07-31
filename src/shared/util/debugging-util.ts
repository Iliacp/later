import { effect, Signal } from '@angular/core';
import { AnyAsyncFunction, AnyFunction } from './typescript-util';
import { SIGNAL } from '@angular/core/primitives/signals';

export function DebugFunctionDecorator(withTiming = false) {
    return function(
        target: object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const initialFn = descriptor.value as AnyFunction;

        descriptor.value = function(...args: any[]) {
            logMethodExecutionStart(withTiming, propertyKey, args);
            const returnValue = initialFn.apply(this, args);
            logMethodExecutionEnd(withTiming, propertyKey, returnValue);
            return returnValue;
        };
    }
}

export function DebugAsyncFunctionDecorator(withTiming = false) {
    return function(
        target: object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const initialFn = descriptor.value as AnyAsyncFunction;

        descriptor.value = async function(...args: any[]) {
            logMethodExecutionStart(withTiming, propertyKey, args);
            const returnValue = await initialFn.apply(this, args);
            logMethodExecutionEnd(withTiming, propertyKey, returnValue);
            return returnValue;
        };
    }
}

function logMethodExecutionStart(withTiming: boolean, methodName: string, args: any[]) {
    if(withTiming)
        console.log(`Starting execution of method '${methodName}' at ${Date.now()}`);
    console.log(`Calling method '${methodName}' with following parameters:`, args);
}

function logMethodExecutionEnd(withTiming: boolean, methodName: string, returnValue: any) {
    console.log(`Method '${methodName}' returned the following:`, returnValue);
    if(withTiming)
        console.log(`Finishing execution of method '${methodName}' at ${Date.now()}`);
}

interface StopwatchMark<T extends string> {
    tag: T;
    time: number;
}

export class Stopwatch<T extends string> {
    private readonly startTime: number;
    private marks: StopwatchMark<T>[] = [];

    private constructor(startTime: number) {
        this.startTime = startTime;
    }
    
    public addMark(tag: T) {
        this.marks.push({tag: tag, time: Date.now() - this.startTime});
    }

    public static start<Tag extends string>(...markTags: Tag[]) {
        return new Stopwatch<Tag>(Date.now());
    }

    public getMarks(): StopwatchMark<T>[] {
        const marksCopy: StopwatchMark<T>[] = [];
        this.marks.forEach(mark => marksCopy.push({...mark}));

        return marksCopy;
    }

    public getFormattedMarks(): string[] {
        return this.getMarks().map(mark => `${mark.tag} - ${mark.time} ms`);
    }
}

/** Has to be called in **injection context** */
export function debugSignal<T>(signal: Signal<T>, name?: string) {
    const message = `DEBUGGING SIGNAL ${name ?? ''}`;

    effect(() => {
        const value = signal();
        console.log(message, value);
    });
}

/**
 * Also prints all signal fields' values.
 * @param [depth=1] How many layers of objects should the method unwrap
 */
export function deepLogAllFields(obj: object, name = 'Object', depth = 1) {
    const prefix = name + ' has the following field: '
    Object.entries(obj).forEach(([key, value]) => {
        if(value && value[SIGNAL]) {
            let signalValue;
            try {
                signalValue = value();
            }
            catch {
                signalValue = value;
            }
            finally {
                console.log(prefix + 'SIGNAL ' + key, signalValue);
            }
        }
        else if(typeof value === 'function') {
            return;
        }
        else if(value && typeof value === 'object' && depth > 0) {
            deepLogAllFields(value, `${name}:${key}`, depth - 1);
        }
        else {
            console.log(prefix + key, value);
        }
    });
}