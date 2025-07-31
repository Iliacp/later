import { ExcludeType } from '../../util/typescript-util';
import { getTypographyClass, LaterUIColor, LaterUITypography, getColor } from './styles-definition';

export type CSSStyles = Partial<ExcludeType<CSSStyleDeclaration, Function>>;

export interface StyleConfig {
    /** List of CSS classes to be applied */
    classes?: string[],
    styles?: CSSStyles
}

export type StyleConfigurator = () => StyleConfig;
/**
 * Null is necessary for methods that conditionally return a configurator,
 * e.g. {@link LaterUIConfigurators.warningColorIf | warningColorIf()}
 */
export type MaybeStyleConfigurators = (StyleConfigurator | null)[];

export class LaterUIConfigurators {
    /** Not strictly necessary but good for readability in templates */
    static if = (condition: boolean) => 
        condition ?
        LaterUIConfigurators :
        null;

    static backgroundColor = (color: LaterUIColor): StyleConfigurator =>
        () => ({styles: {backgroundColor: `var(${getColor(color)})`}});

    static textColor = (color: LaterUIColor): StyleConfigurator =>
        () => ({styles: {color: `var(${getColor(color)})`}});

    static typography = (...typo: LaterUITypography[]): StyleConfigurator =>
        () => ({classes: typo.map(t => getTypographyClass(t))});
}
