import { OutputEmitterRef, PipeTransform, Type } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, mergeWith, Observable, switchMap, takeUntil } from 'rxjs';
import { outputToObservable } from '@angular/core/rxjs-interop';

/**
 * @returns An observable which you can fully control.
 * @param initialValue If defined, this value will be emitted instantly on subscription (via a BehaviorSubject). If not, the observable will first emit when nextTrigger$ emits.
 * @param nextTrigger$ Makes the test observable emit a value
 * @param completeTrigger$ Completes the test observable
 * @param errorTrigger$ Makes the test observable emit an error
 */
export function getTestObservable<T>(
    initialValue: T | undefined,
    nextTrigger$?: Observable<T>,
    completeTrigger$?: Observable<void>,
    errorTrigger$?: Observable<Error | void>
    ): Observable<T>
{
    let subject$: Observable<T>;
    if(initialValue)
        subject$ = new BehaviorSubject(initialValue).asObservable();
    else
        subject$ = new Observable();

    if(nextTrigger$)
        subject$ = subject$.pipe(mergeWith(nextTrigger$));

    if(completeTrigger$)
        subject$ = subject$.pipe(takeUntil(completeTrigger$));

    if(errorTrigger$) {
        const error$ = errorTrigger$.pipe(map((error: Error | void) => {
            throw error || new Error('Test subject error trigger pulled');
        }));
        subject$ = subject$.pipe(switchMap(() => error$));
    }
    return subject$;
}

/**
 * @impure
 */
export function removePipeLogic(pipe: Type<PipeTransform>) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (pipe.prototype as PipeTransform).transform = () => {};
}

export function outputToPromise<T>(output: OutputEmitterRef<T>) {
    return firstValueFrom(outputToObservable(output));
}
