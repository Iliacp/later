import { ExcludeType } from '../../util/typescript-util';
import { getTypographyClass, getTextColorClass, LaterUITextColor, LaterUITypography } from './styles-definition';

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
    static defaultTitle: StyleConfigurator = () => ({
        classes: [getTypographyClass('bold')],
        styles: {
            margin: '0px'
        }
    });
    
    static defaultContent: StyleConfigurator = () => ({
        classes: [getTypographyClass('body-1')],
        styles: {
            wordBreak: 'break-word',
            margin: '0px'
        }
    });
    
    static warningColor: StyleConfigurator = () => ({
        classes: [getTextColorClass('red')]
    });

    static warningColorIf = (condition: boolean) =>
        condition ? this.warningColor : null;

    static textColor = (color: LaterUITextColor): StyleConfigurator =>
        () => ({classes: [getTextColorClass(color)]});

    static typography = (...typo: LaterUITypography[]): StyleConfigurator =>
        () => ({classes: typo.map(t => getTypographyClass(t))});
}
