import { ResourceRef, effect, Signal, linkedSignal } from '@angular/core';
import { Observable } from 'rxjs';

/** Has to be run in **injection context** */
export function resourceToPromise<T>(resource: ResourceRef<T>, resolveIfNotLoading = false): Promise<T | undefined> {
  if(!resource.isLoading() && resolveIfNotLoading) {
    if(resource.error()) return Promise.reject(resource.value());
    else return Promise.resolve(resource.value());
  }

  let resolve: (data: T) => void;
  let reject: (reason: unknown) => void;

  const effectRef = effect(() => {
    const error = resource.error();
    if(error) return reject(error);

    const value = resource.value();
    if(!value || resource.isLoading()) return;

    resolve!(value);
    effectRef.destroy();
  });

  return new Promise<T>((res, rej) => {resolve = res, reject = rej})
}

/**
 * By default resource.value() is undefined while loading.
 * This function returns a signal that will remember the last
 * resource value until it finishes loading.
 * 
 * Has to be run in **injection context**
 */
export function cacheResource<T>(resource: ResourceRef<T>): Signal<T | undefined> {
  return linkedSignal<{current: T | undefined, isLoading: boolean}, T | undefined>({
    source: () => ({current: resource.value(), isLoading: resource.isLoading()}),
    computation: ({current, isLoading}, previous) =>
        isLoading ? previous?.value : current
  }).asReadonly();
}

export function abortSignalToObservable(abort: AbortSignal): Observable<Event> {
  return new Observable(subject => {
    abort.onabort = (event) => subject.next(event);
    setTimeout(() => subject.complete());
  });
}
export function abortSignalToPromise(abort: AbortSignal): Promise<Event> {
  return new Promise(res => abort.onabort = res);
}

/** Has to be run in **injection context** */
export async function waitForSignalChange<T>(signal: Signal<T>, predicate: (value: T) => boolean): Promise<T>;
export async function waitForSignalChange<IN, OUT extends IN>(signal: Signal<IN>, predicate: (value: IN) => value is OUT): Promise<OUT>;
export async function waitForSignalChange(signal: Signal<unknown>, predicate: (value: unknown) => boolean): Promise<unknown> {
  return new Promise((resolve) =>
      effect(() => {
          const value = signal();

          if (predicate(value)) resolve(value);
      })
  )
}