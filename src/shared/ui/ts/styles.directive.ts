import { computed, Directive, input } from '@angular/core';
import { isNotNull, combineObjects } from '../../util/typescript-util';
import { MaybeStyleConfigurators } from './styles-configuration';

@Directive({
    selector: '[laterStyle]',
    host: {
        '[style]': 'styles()',
        '[class]': 'classList()'
    }
})
export class LaterStyleDirective {
    configurators = input<MaybeStyleConfigurators>([], {alias: 'laterStyle'});

    protected classList = computed(() => this.configurators().filter(isNotNull).flatMap(fn => fn()?.classes ?? []));
    protected styles = computed(() => {
        const styles = this.configurators().filter(isNotNull).map(fn => fn()?.styles ?? {});
        return combineObjects(...styles);
    });
}