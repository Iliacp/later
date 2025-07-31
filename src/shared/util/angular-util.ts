import { ComponentRef } from '@angular/core';
import { UnwrapSignal } from './typescript-util';

/** A simple curried wrapper around {@link ComponentRef.setInput } that ensures type safety */
export const setInput = <C>(componentRef: ComponentRef<C>) =>
    <K extends keyof C>(key: K, value: UnwrapSignal<C[K]>) =>
        componentRef.setInput(key.toString(), value);

/**
 * A simple curried wrapper around {@link ComponentRef.setInput } that ensures type safety and allows for
 * setting multiple inputs at once.
 */
export const setInputs = <C>(componentRef: ComponentRef<C>) =>
    <K extends keyof C>(inputs: { [P in K]: UnwrapSignal<C[P]> }) =>
        Object.entries(inputs).forEach(([key, value]) =>
            componentRef.setInput(key.toString(), value));